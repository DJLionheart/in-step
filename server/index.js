require('dotenv').config();

const express = require('express')
    , massive = require('massive')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , SpotifyStrategy = require('passport-spotify');


const app = express();

const { YE_OLDE_PORTE, SESSION_SECRET, DOMAIN, A0_CLIENT_ID, A0_CLIENT_SECRET, CALLBACK_URL, CONNECTION_STRING } = process.env;

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

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: A0_CLIENT_ID,
    clientSecret: A0_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    console.log(profile);
    
        const db = app.get('db');
        const { id, displayName, picture } = profile;

        db.find_user([id]).then( users => {
            if(users[0]) {
                return done(null, users[0].id)
            } else {
                db.create_user([displayName, picture, id]).then( createdUser => {
                    return done(null, createdUser[0])
            })
        }
    })
}))


passport.use(new SpotifyStrategy({
    clientID: S_CLIENT_ID,
    clientSecret: S_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  }, function(accessToken, refreshToken, expires_in, profile, done) {
        const db = app.get('db');
        const { id, displayName, picture } = profile;

        db.find_user([id]).then( users => {
            if(users[0]) {
                return done(null, users[0].id)
            } else {
                db.create_user([displayName, picture, id]).then( createdUser => {
                return done(null, createdUser[0])

            })
        }
    })
}));

passport.serializeUser( (id, done) => {
    return done(null, id)
})

passport.deserializeUser( (id, done) => {
    return done(null, id)

})

app.get('/api/auth/spotify', passport.authenticate('spotify'))

app.listen(YE_OLDE_PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${YE_OLDE_PORTE}, sire!`) })