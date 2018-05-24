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
    , us_ctrl = require('./controllers/user_controller')
    , fv_ctrl = require('./controllers/favs_controller')


const app = express();

const { 
    YE_OLDE_PORTE,
    SESSION_SECRET, 
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    AUTHENTICATE,
    AUTH_NEXT,
    REACT_APP_AUTH_ME,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT,
    REACT_APP_USERS,
    REACT_APP_SEARCH,
    REACT_APP_LOGOUT,
    GET_ADD_PL,
    ALT_OR_DELETE_PL,
    ADD_RMV_SONG,
    CLEAR_ALL,
    REACT_APP_FAVS,
    FAV_UNFAV,
    REACT_APP_HOME,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS

} = process.env;

app.use( express.static( `${__dirname}/../build` ) );

app.use(express.json());

// app.use(cors);

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
    callbackURL: CALLBACK_URL,
    scope: ['playlist-modify', 'playlist-modify-private', 'playlist-modify-public', 'user-read-email'], showDialog: true
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

app.get(AUTHENTICATE, passport.authenticate('spotify', {scope: ['playlist-modify', 'playlist-modify-private', 'playlist-modify-public', 'user-read-email'], showDialog: true}))

app.get(AUTH_NEXT, passport.authenticate('spotify', {
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
}))

passport.serializeUser( (id, done) => {
    return done(null, id)
})

passport.deserializeUser( (id, done) => {
    db.user.find_session_user([id]).then( user => {
        return done(null, user[0])
    })
})

app.get(REACT_APP_AUTH_ME, function(req, res) {
    
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.sendStatus(401)
    }
})  


// const logout = function() {
//     return function(req, res, next) {
//         req.logout();
//         delete req.session;
//         next()
//     }
// }

app.post(REACT_APP_LOGOUT, (req, res) => {
    req.logout();
    delete req.session;
    console.log('Logged out');
    res.status(200).send('Logout complete');
});

// app.post(REACT_APP_LOGOUT, logout, function(req, res) {
//     console.log('Logged out');
//     res.sendFile(path.resolve(REACT_APP_HOME));
// })

// DB Search
app.get(REACT_APP_SEARCH, src_ctrl.search);

// User
app.get(REACT_APP_USERS, us_ctrl.getPreferences)
app.post(REACT_APP_USERS, us_ctrl.postPreferences)
app.put(REACT_APP_USERS, us_ctrl.putPreferences)

// Playlist Management
app.get(GET_ADD_PL, pl_ctrl.getPlaylists)
app.post(GET_ADD_PL, pl_ctrl.create_playlist)
app.put(ALT_OR_DELETE_PL, pl_ctrl.rename_playlist)
app.delete(ALT_OR_DELETE_PL, pl_ctrl.delete_playlist)

app.post(ADD_RMV_SONG, pl_ctrl.addSong)
app.delete(ADD_RMV_SONG, pl_ctrl.removeSong)
app.delete(CLEAR_ALL, pl_ctrl.delete_all_tracks)

// Favorites
app.get(REACT_APP_FAVS, fv_ctrl.getFavs)
app.post(FAV_UNFAV, fv_ctrl.addFav)
app.delete(FAV_UNFAV, fv_ctrl.unFav)

// End of Massive Connection Wrapper
})
                            
app.listen(YE_OLDE_PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${YE_OLDE_PORTE}, sire!`) })