const GET_USER = 'GET_USER'
    , GET_PREFERENCES = 'GET_PREFERENCES'
    , POST_PREFERENCES = 'POST_PREFERENCES'
    , PUT_PREFERENCES = 'PUT_PREFERENCES'
    , PLAYLISTS = 'PLAYLISTS'
    , GET_PLAYLISTS = 'GET_PLAYLISTS'
    , GET_FAVORITES = 'GET_FAVORITES'
    , CHANGE_INDEX = 'CHANGE_INDEX'
    , LOGOUT = 'LOGOUT'
    , APPLY_PREFS = 'APPLY_PREFS';

module.exports = {
    get_user: function(user) {
        return {
            type: GET_USER,
            payload: user
        }
    },

    put_playlists: playlists => {
        return {
            type: PLAYLISTS,
            payload: playlists
        }
    }
}