require('dotenv').config();

const express = require('express')
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    // , Auth0Strategy = require('passport-auth0')
    , SpotifyStrategy = require('passport-spotify').Strategy;


const app = express();

const { 
    YE_OLDE_PORTE,
    SESSION_SECRET, 
    DOMAIN,
    // A0_CLIENT_ID,
    // A0_CLIENT_SECRET,
    // A0_CALLBACK_URL,
    S_CLIENT_ID,
    S_CLIENT_SECRET,
    S_CALLBACK_URL,
    CONNECTION_STRING,
    LOGOUT_URL
} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true    
}))

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new Auth0Strategy({
//     domain: DOMAIN,
//     clientID: A0_CLIENT_ID,
//     clientSecret: A0_CLIENT_SECRET,
//     callbackURL: A0_CALLBACK_URL,
//     scope: 'openid profile email'
// }, function(accessToken, refreshToken, extraParams, profile, done){
    
    
//         const db = app.get('db');
//         const { id, displayName, picture } = profile
//             , { email } = profile._json;

//         db.find_user([id]).then( users => {
//             if(users[0]) {
//                 return done(null, users[0].userid)
//             } else {
//                 db.create_user([displayName, picture, id, null, email, 'Google']).then( createdUser => {
//                     return done(null, createdUser[0])
//             })
//         }
//     })
// }))


passport.use(new SpotifyStrategy({
    clientID: S_CLIENT_ID,
    clientSecret: S_CLIENT_SECRET,
    callbackURL: S_CALLBACK_URL
    // scope: ['playlist-modify-private', 'user-read-email'], showDialog: true
  }, function(accessToken, refreshToken, expires_in, profile, done) {
    //   console.log(profile);
      
        const db = app.get('db');
        const { id, displayName, photos, profileUrl } = profile
            , { email } = profile._json;

        db.find_user([id]).then( users => {
            if(users[0]) {
                return done(null, users[0].userid)
            } else {
                db.create_user([displayName, photos[0], id, profileUrl, email, 'Spotify']).then( createdUser => {
                return done(null, createdUser[0])
            })
        }
    })
}));

app.get('/api/auth/spotify', passport.authenticate('spotify', {scope: ['playlist-modify-private', 'user-read-email'], show_dialog: true}))

app.get('/api/auth/spotify/callback', passport.authenticate('spotify', {
    successRedirect: 'http://localhost:3000/#/loading',
    failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/api/auth', passport.authenticate('auth0'));
function mid(res, req, next) {
    console.log('hit');
    next();
    
}

// app.get('/api/auth/callback', mid, passport.authenticate('auth0', {
//     successRedirect: 'http://localhost:3000/#/loading',
//     failureRedirect: 'http://localhost:3000/#/'
// }))


passport.serializeUser( (id, done) => {
    return done(null, id)
})

passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then( user => {
        return done(null, user[0])
    })
})

app.get('/api/auth/me', function(req, res) {
    
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.sendStatus(401)
    }
})


const logout = function() {
    return function(req, res, next) {
        req.logout();
        delete req.session;
        next()
    }
}

app.post('/api/logout', logout, function(req, res) {
    console.log('Logged out');
    res.sendFile(path.resolve(LOGOUT_URL));
    // res.redirect('http://localhost:3000/#/') 
})


app.listen(YE_OLDE_PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${YE_OLDE_PORTE}, sire!`) })