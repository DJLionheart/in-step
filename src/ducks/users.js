import axios from 'axios';

const initialState = {
    user: {
        username: 'User'
    }, 
    user_preferences: {
        user_genres: ['None selected'],
        user_pace: 'None selected'
    },
    favorite_tracks: [],
    current_index: 0,
    indexMatrix: {},
    
    playlists: []
}

const FULFILLED = '_FULFILLED';

const GET_USER = 'GET_USER'
    , GET_PREFERENCES = 'GET_PREFERENCES'
    , POST_PREFERENCES = 'POST_PREFERENCES'
    , PLAYLISTS = 'PLAYLISTS'
    , GET_PLAYLISTS = 'GET_PLAYLISTS'
    , GET_FAVORITES = 'GET_FAVORITES'
    , CHANGE_INDEX = 'CHANGE_INDEX'
    , LOGOUT = 'LOGOUT'
    , APPLY_PREFS = 'APPLY_PREFS';

const {
    REACT_APP_PLAYLISTS,
    REACT_APP_FAVS,
    REACT_APP_USERS,

} = process.env

// export function get_user() {
//     let userData = axios.get('/api/auth/me').then( res => {
//         return res.data
//     })

//     return {
//         type: GET_USER,
//         payload: userData
//     }
// }

// TEST
export function get_user(user) {
    return {
        type: GET_USER,
        payload: user
    }
}

export function put_playlists(playlists) {
    return {
        type: PLAYLISTS,
        payload: playlists
    }
}

export function get_playlists(userid) {
    // let indexMatrix = {};

    let playlistData = axios.get(`${REACT_APP_PLAYLISTS}/${userid}`).then( res => {
        console.log('Get playlists: ', res.data)
        // res.data.forEach( playlist => {
        //     const { playlist_id, playlist_index } = playlist 
        //     indexMatrix[playlist_index] = playlist_id
        // })
        // console.log('Index matrix: ', indexMatrix)

        return res.data
    }).catch(err => console.log('Error getting playlists: ', err))
    
    return {
        type: GET_PLAYLISTS,
        payload: playlistData
    }
}

export function get_favorites(userid) {
    // let indexMatrix = {};

    let favoriteTracks = axios.get(`${REACT_APP_FAVS}/${userid}`).then( res => {
        console.log('Get favorites: ', res.data)

        return res.data
    })
    
    return {
        type: GET_FAVORITES,
        payload: favoriteTracks
    }
}

export function apply_prefs(preferences){
    return {
        type: APPLY_PREFS,
        payload: preferences
    }
}
export function get_preferences(userid) {
    let preferences = axios.get(`${REACT_APP_USERS}?userid=${userid}`).then( res => {
        // console.log('User preferences: ', res.data)
        return res.data
    })
    
    return {
        type: GET_PREFERENCES,
        payload: preferences
    }
}

export function post_user_preferences(userid, userGenrePrefs, user_pace) {
    let user_preferences = axios.post(`/api/user_preferences?userid=${userid}`, {userGenrePrefs, user_pace}).then( res => {
        // console.log('Preferences after saving to DB: ', res.data)
        return res.data;
    }).catch(err => console.log('Something went wrong: ', err))
    // setTimeout( () => console.log('Preferences: ', preferences), 5000)

    return {
        type: POST_PREFERENCES,
        payload: user_preferences
    }
}

export function put_user_preferences(userid, userGenrePrefs, user_pace) {
    let user_preferences = axios.put(`/api/user_preferences?userid=${userid}`, {userGenrePrefs, user_pace}).then( res => {
        // console.log('Preferences after saving to DB: ', res.data)
        return res.data;
    }).catch(err => console.log('Something went wrong: ', err))
    // setTimeout( () => console.log('Preferences: ', preferences), 5000)

    return {
        type: POST_PREFERENCES,
        payload: user_preferences
    }
}

export function changeIndex(index) {
    return {
        type: CHANGE_INDEX,
        payload: index
    }
}

export function log_out() {
    return {
        type: LOGOUT,
        payload: {}
    }
}


export default function users(state = initialState, action) {
    // const { playlists, indexMatrix, current_index } = state;
    
    switch( action.type ) {
        // case GET_USER + PENDING:
        //     console.log('pending');
        //     break;
        
        // case GET_USER + REJECTED:
        //     console.log('rejected');
        //     break;
            
        // case GET_USER + FULFILLED:
        //     return Object.assign({}, state, {user: action.payload});

        case PLAYLISTS:
            return Object.assign({}, state, {playlists: action.payload});

        case GET_USER:
            return Object.assign({}, state, {user: action.payload});

        case APPLY_PREFS: 
            return Object.assign({}, state, {user_preferences: action.payload})
            
        case GET_PLAYLISTS + FULFILLED:
            let matrix = {};
            action.payload.forEach( playlist => {
                const { playlist_id, playlist_index } = playlist 
                matrix[playlist_index] = playlist_id;
            })

            console.log('Playlists saved to Redux: ', action.payload)
            console.log('Index Matrix: ', matrix)
            return Object.assign({}, state, { playlists: action.payload, indexMatrix: matrix })

        // case ADD_PLAYLIST + FULFILLED:
        //     let playlist_added = playlists.slice(),
        //         created_playlist = Object.assign({}, action.payload);

        //     created_playlist.playlist_index = playlists.length;
        //     created_playlist.tracks = [];

        //     let newMatrix = Object.assign({}, indexMatrix)
        //     newMatrix[created_playlist.playlist_index] = created_playlist.playlist_id;
            
        //     playlist_added = [...playlist_added, created_playlist];
        //     console.log('Playlist added: ', playlist_added, 'indexMatrix uptated: ', newMatrix)
        //     return Object.assign({}, state, { playlists: playlist_added, indexMatrix: newMatrix })

        // case RENAME_PLAYLIST + FULFILLED:
        //     let playlist_renamed = playlists.slice();
        //     playlist_renamed[current_index].playlist_name = action.payload;
        //     console.log('Redux playlist successfully renamed: ', playlist_renamed);
        //     return Object.assign({}, state, {playlists: playlist_renamed})    

        // case REMOVE_PLAYLIST + FULFILLED:
        //     let playlist_removed = playlists.slice()

        //     playlist_removed.splice(action.payload, 1)
        //     console.log('Playlists left: ', playlist_removed)
        //     let matrix_after = {};
        //     playlist_removed.forEach( (pl, i) => {
        //         pl.playlist_index = i;
        //         matrix_after[i] = pl.playlist_id;
        //         console.log('Playlist removed: ', playlist_removed, 'indexMatrix updated: ', matrix_after);
        //     })
        //     return Object.assign({}, state, { playlists: playlist_removed, indexMatrix: matrix_after })

        // case ADD_TRACK + FULFILLED:
        //     console.log(playlists)
        //     let newPlContainer = playlists.slice();
        //     console.log(newPlContainer)
        //     let updatedPlaylist = Object.assign({}, playlists[current_index]) ;
    
        //     updatedPlaylist.tracks.push(action.payload)

        //     newPlContainer.splice(current_index, 1, updatedPlaylist)
        //     console.log('Redux track successfully added: ', newPlContainer)
        //     return Object.assign({}, state, { playlists: newPlContainer})

        // case REMOVE_TRACK + FULFILLED:
        //         let new_plContainer = playlists.slice(),
        //             newTracksArray = new_plContainer[current_index].tracks.filter( track => track.track_num !== action.payload) ;

        //     new_plContainer[current_index].tracks = newTracksArray;
        //     console.log('Redux track successfully removed: ', new_plContainer)
        //     return Object.assign({}, state, { playlists: new_plContainer})

        // case CLEAR_ALL + FULFILLED:
        //     let afterClear_plContainer = playlists.slice();

        //     afterClear_plContainer[current_index].tracks = [];
        //     console.log('All tracks successfully removed from Redux playlist: ', afterClear_plContainer)
        //     return Object.assign({}, state, { playlists: afterClear_plContainer})

        case GET_FAVORITES + FULFILLED:
            console.log('Favorites saved to redux: ', action.payload)
            return Object.assign({}, state, { favorite_tracks: action.payload })

        case GET_PREFERENCES + FULFILLED:
            console.log('Preferences saved to Redux: ', action.payload)
            return Object.assign({}, state, { user_preferences: action.payload })

        case POST_PREFERENCES + FULFILLED:
            console.log('Post preferences fulfilled: ', action.payload)
            return Object.assign({}, state, {user_preferences: action.payload});

        // case GET_MATRIX:
        //     console.log('Matrix saved to Redux: ', action.payload)
        //     return Object.assign({}, state, { indexMatrix: action.payload })
        
        case CHANGE_INDEX:
            return Object.assign({}, state, { current_index: action.payload })
        
        case LOGOUT: 
            return Object.assign(action.payload, initialState)
        
        case 'persist/REHYDRATE':
            return { ...state, persistedState: action.payload };

        default:
            return state;
    }
}