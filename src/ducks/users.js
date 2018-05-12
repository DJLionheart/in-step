import axios from 'axios';
import filter from 'lodash/filter';

const initialState = {
    user: {}, 
    user_preferences: {
        user_genres: [],
        user_pace: ''
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
    , GET_PLAYLISTS = 'GET_PLAYLISTS'
    , ADD_PLAYLIST = 'ADD_PLAYLIST'
    , REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
    , ADD_TRACK = 'ADD_TRACK'
    , REMOVE_TRACK = 'REMOVE_TRACK'
    , GET_FAVORITES = 'GET_FAVORITES'
    , GET_MATRIX = 'GET_MATRIX'
    , CHANGE_INDEX = 'CHANGE_INDEX'
    , LOGOUT = 'LOGOUT';

const {
    REACT_APP_PLAYLISTS,
    REACT_APP_FAVS,
    REACT_APP_USERS

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

export function add_playlist(userid, playlistName) {
    // let indexMatrix = {};

    let newPlaylist = axios.post(`${REACT_APP_PLAYLISTS}/${userid}`, {playlist_name: playlistName}).then( res => {
        console.log('Playlist created on server: ', res.data)
        return res.data
    }).catch(err => console.log('Error getting playlists: ', err))
    
    return {
        type: ADD_PLAYLIST,
        payload: newPlaylist
    }
}

export function remove_playlist(userid, idToRemove) {
    // let indexMatrix = {};

    let id_to_remove = axios.delete(`${REACT_APP_PLAYLISTS}/${userid}?playlist_id=${idToRemove}`).then( res => {
        console.log(`Playlist${idToRemove} deleted from server`, res.data)
        return idToRemove
    }).catch(err => console.log('Error getting playlists: ', err))
    
    return {
        type: ADD_PLAYLIST,
        payload: id_to_remove
    }
}




export function add_track(add_plId, track) {
    const { track_id } = track
    let addedTrack = axios.post(`${REACT_APP_PLAYLISTS}/manage/${add_plId}`, {track_id: track_id}).then( res => {
        console.log(`Track ${track_id} added to Playlist ${add_plId}: `, res.data)
        return track;
    }).catch(err => console.log('Error adding track: ', err))

    return {
        type: ADD_TRACK,
        payload: {
            addedTrack: addedTrack,
            add_plId: add_plId
        }
    }
}

export function remove_track(rmv_plId, track_num) {
    let removeNum = axios.delete(`${REACT_APP_PLAYLISTS}/manage/${rmv_plId}?track_num=${track_num}`).then( res => {
        console.log(` remove_track query sent: `, res.data)
        return track_num;
    }).catch(err => console.log('Error adding track: ', err))

    return {
        type: REMOVE_TRACK,
        payload: {
            removeNum: removeNum,
            rmv_plId: rmv_plId

        }
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

export function get_matrix(matrix) {
    console.log('Action creator: ', matrix)
    return {
        type: GET_MATRIX,
        payload: matrix
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

export function changeIndex(index) {
    return {
        type: CHANGE_INDEX,
        payload: index
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: {}
    }
}


export default function users(state = initialState, action) {
    const { playlists, indexMatrix } = state;
    
    switch( action.type ) {
        // case GET_USER + PENDING:
        //     console.log('pending');
        //     break;
        
        // case GET_USER + REJECTED:
        //     console.log('rejected');
        //     break;
            
        // case GET_USER + FULFILLED:
        //     return Object.assign({}, state, {user: action.payload});

        case GET_USER:
            return Object.assign({}, state, {user: action.payload});

        case GET_PLAYLISTS + FULFILLED:
            let matrix = {};
            action.payload.forEach( playlist => {
                const { playlist_id, playlist_index } = playlist 
                matrix[playlist_index] = playlist_id;
                matrix[playlist_id] = playlist_index;
            })

            console.log('Playlists saved to Redux: ', action.payload)
            console.log('Index Matrix: ', matrix)
            return Object.assign({}, state, { playlists: action.payload, indexMatrix: matrix })

        case ADD_PLAYLIST + FULFILLED:
            let playlist_added = playlists.slice(),
                created_playlist = Object.assign({}, action.payload);

            created_playlist.playlist_index = playlists.length + 1;
            created_playlist.tracks = [];

            let newMatrix = Object.assign({}, indexMatrix)
            newMatrix[created_playlist.playlist_id] = created_playlist.playlist_index;
            newMatrix[created_playlist.playlist_index] = created_playlist.playlist_id;
            
            playlist_added = [...playlist_added, created_playlist];
            console.log('Playlist added, indexMatrix uptated')
            return Object.assign({}, state, { playlists: playlist_added, indexMatrix: newMatrix })

        case REMOVE_PLAYLIST + FULFILLED:
            let playlist_removed = filter(playlists, {playlist_id:  !action.payload});

            console.log('Playlists left: ', playlist_removed)
            
            let matrix_after = {};

            playlist_removed.forEach( (pl, i) => {
                pl.playlist_index = i;
                matrix_after[i] = pl.playlist_id;
                matrix_after[pl.playlist_id] = i
            })
            console.log('Playlist removed, indexMatrix updated');
            return Object.assign({}, state, { playlists: playlist_removed, indexMatrix: matrix_after })

        case ADD_TRACK + FULFILLED:
            const { add_plId, addedTrack } = action.payload

            let add_thisIndex = indexMatrix[add_plId];
            
            console.log(playlists)
            let newPlContainer = playlists.slice();
            console.log(newPlContainer)
            let updatedPlaylist = Object.assign({}, playlists[add_thisIndex]) ;

            updatedPlaylist.tracks = [...updatedPlaylist.tracks, addedTrack]

            newPlContainer.splice(add_thisIndex, 1, updatedPlaylist)
            console.log('Redux track successfully added: ', newPlContainer)
            return Object.assign({}, state, { playlists: newPlContainer})

        case REMOVE_TRACK + FULFILLED:
            const { rmv_plId, removeNum } = action.payload

            let rmv_thisIndex = indexMatrix[rmv_plId],
                new_plContainer = playlists.slice(),
                newTracksArray = new_plContainer[rmv_thisIndex].tracks.filter( track => track.track_num !== removeNum) ;

            new_plContainer[rmv_thisIndex].tracks = newTracksArray;
            console.log('Redux track successfully removed: ', new_plContainer)
            return Object.assign({}, state, { playlists: new_plContainer})

        case GET_FAVORITES + FULFILLED:
            console.log('Favorites saved to redux: ', action.payload)
            return Object.assign({}, state, { favorite_tracks: action.payload })

        case GET_PREFERENCES + FULFILLED:
            console.log('Preferences saved to Redux: ', action.payload)
            return Object.assign({}, state, { user_preferences: action.payload })

        case POST_PREFERENCES + FULFILLED:
            console.log('Post preferences fulfilled: ', action.payload)
            return Object.assign({}, state, {user_preferences: action.payload});

        case GET_MATRIX:
            console.log('Matrix saved to Redux: ', action.payload)
            return Object.assign({}, state, { indexMatrix: action.payload })
        
        case CHANGE_INDEX:
            return Object.assign({}, state, { current_index: action.payload })
        
        case LOGOUT: 
            return Object.assign({}, state, {})
        
        default:
            return state;
    }
}