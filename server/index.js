require('dotenv').config();

global.globalIndex = 281

const express = require('express')
    , massive = require('massive')
    , axios = require('axios')
    , session = require('express-session')
    , passport = require('passport')
    , SpotifyStrategy = require('passport-spotify').Strategy;


const app = express();

const { 
    YE_OLDE_PORTE,
    SESSION_SECRET, 
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    LOGOUT_URL
} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true    
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new SpotifyStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  }, function(accessToken, refreshToken, expires_in, profile, done) {
      
        const db = app.get('db');
        const { id, displayName, photos, profileUrl } = profile
            , { email } = profile._json;

        db.find_user([id]).then( users => {
            if(users[0]) {
                console.log('Access token expires in:', expires_in);
                db.update_user([id, accessToken, refreshToken])
                return done(null, users[0].userid)
            } else {
                console.log('Access token expires in:', expires_in);
                
                db.create_user([displayName, photos[0], id, profileUrl, email, accessToken, refreshToken]).then( createdUser => {
                return done(null, createdUser[0])
            })
        }
    })
}));

app.get('/api/auth', passport.authenticate('spotify', {scope: ['playlist-modify', 'playlist-modify-private', 'user-read-email'], showDialog: true}))

app.get('/api/auth/callback', passport.authenticate('spotify', {
    successRedirect: 'http://localhost:3000/#/loading',
    failureRedirect: 'http://localhost:3000/#/'
}))

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

// DB Search
app.get('/api/search', (req, res, next) => {
    
    const { type, search } = req.query;
    if( type === 'bpm' ) {
        const lower = +search-15
            , upper = +search+15;
        db.search_bpm([lower, upper]).then( results => {
            res.status(200).send(results)
        }).catch(err => console.log(err))
    } else {
        console.log('Req.query: ', req.query);
        
        db.search([type, `%${search}%`]).then( results => {
            console.log(results);
            
            res.status(200).send(results)
        }).catch(err => console.log(err))
    }
})



// End of Massive Connection Wrapper
})

app.listen(YE_OLDE_PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${YE_OLDE_PORTE}, sire!`) })