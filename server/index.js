require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , axios = require('axios')
    , session = require('express-session')
    , passport = require('passport')
    , SpotifyStrategy = require('passport-spotify').Strategy
    , src_ctrl = require('./controllers/search_controller')
    , pl_ctrl = require('./controllers/playlist_controller')
    , us_ctrl = require('./controllers/user_controller');


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
    console.log('ID: ', id)
    db.user.find_user([+id]).then( users => {
        if(users[0]) {
            console.log('Access token expires in:', expires_in);
            db.user.update_user([+id, accessToken, refreshToken])
            return done(null, users[0].userid)
        } else {
            console.log('Access token expires in:', expires_in);
            
            db.user.create_user([displayName, photos[0], +id, profileUrl, email, accessToken, refreshToken]).then( createdUser => {
                return done(null, createdUser[0])
            }).catch( err => console.log('Create User Error: ', err))
        }
    }).catch(err => console.log('Find User Error: ', err))
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
    db.user.find_session_user([id]).then( user => {
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
app.get('/api/search', src_ctrl.search);

// User and Playlist Management
app.get('/api/user_preferences', us_ctrl.getPreferences)
app.post('/api/user_preferences', us_ctrl.postPreferences)

app.get('/api/playlists/:userid', pl_ctrl.getPlaylists)
app.post('/api/playlists/:userid', pl_ctrl.create_playlist)
app.delete('/api/playlists/:userid', pl_ctrl.delete_playlist)

app.post('/api/playlist/add_to/:id', pl_ctrl.addSong)
                        
// End of Massive Connection Wrapper
})
                            
app.listen(YE_OLDE_PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${YE_OLDE_PORTE}, sire!`) })