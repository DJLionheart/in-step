import axios from 'axios';

const initialState = {
    user: {}, 
    user_preferences: {
        user_genres: [],
        user_pace: ''
    },
    favorite_tracks: [],
    current_index: 0,
    playlists: [
        {playlist_name: 'Playlist 1', playlist_id: 2, playlist_index: 0, tracks: [
            {
                artist_name: "Dreams Come True",
                bpm: 180,
                track_genre: "J-Pop",
                track_id: 39,
                track_name: "The Swinging Star",
                track_year: 1992
            },
            {
                artist_name: "Greeeen",
                bpm: 176,
                track_genre: "J-Pop",
                track_id: 845,
                track_name: "Kimi Omoi",
                track_year: 2009
            }
        ]}
    ]

}

const FULFILLED = '_FULFILLED';

const GET_USER = 'GET_USER'
    , GET_PREFERENCES = 'GET_PREFERENCES'
    , POST_PREFERENCES = 'POST_PREFERENCES'
    , GET_PLAYLISTS = 'GET_PLAYLISTS'
    , ADD_SONG = 'ADD_SONG'
    , REMOVE_SONG = 'REMOVE_SONG'
    , CHANGE_INDEX = 'CHANGE_INDEX'
    , ADD_PLAYLIST = 'ADD_PLAYLIST'
    , REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
    , LOGOUT = 'LOGOUT';

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
    let playlistData = axios.get(`/api/playlists?userid=${userid}`).then( res => {
        console.log('Get playlists: ', res.data)
        // let index = 0,
        //     playlist_container = [];

        // forEach(res.data, function(value, key){

        // })

            // playlist_name: playlist.playlist_name,
            //         playlist_id: playlist.playlist_id,
            //         playlist_index: index,
            //         tracks: playlist        // for(var playlist in res.data) {
        //     playlist_container.push({
        //         playlist_name: playlist.playlist_name,
        //         playlist_id: playlist.playlist_id,
        //         playlist_index: index,
        //         tracks: playlist
        //     })
            // index++

        return res.data
    })
    
    return {
        type: GET_PLAYLISTS,
        payload: playlistData
    }
}

export function get_preferences(userid) {
    let preferences = axios.get(`/api/user_preferences?userid=${userid}`).then( res => {
        console.log('User preferences: ', res.data)
        return res.data
    })
    
    return {
        type: GET_PREFERENCES,
        payload: preferences
    }
}

export function post_user_preferences(userid, userGenrePrefs, user_pace) {
    axios.post(`/api/user_preferences?userid=${userid}`, {userGenrePrefs, user_pace}).then( res => {
        console.log('Preferences saved')
    }).catch(err => console.log('Something went wrong: ', err))
    return {
        type: POST_PREFERENCES,
        payload: {
            user_genres: userGenrePrefs,
            user_pace: user_pace 
        }
    }
}

export function add_song(id, playlistId) {
    axios.post(`/api/playlist/add_to/${playlistId}`, {track_id: id}).then( res => {
        console.log('Add Song response: ', res)  
    })
}

export function remove_song(id, playlistId) {
    return {
        type: REMOVE_SONG,
        payload: id
    }
}

export function changeIndex(index) {
    return {
        type: CHANGE_INDEX,
        payload: index
    }
}

export function add_playlist(num) {
    return {
        type: ADD_PLAYLIST,
        payload: {name: `Playlist ${num}`, tracks: []}
    }
}

export function remove_playlist(number) {
    return {
        type: REMOVE_PLAYLIST,
        payload: number
    }
}



export function logout() {
    return {
        type: LOGOUT,
        payload: {}
    }
}


export default function users(state = initialState, action) {
    
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
            return Object.assign({}, state, { playlists: action.payload })

        case GET_PREFERENCES + FULFILLED:
            return Object.assign({}, state, { user_preferences: action.payload })

        case POST_PREFERENCES + FULFILLED:
            const { user_genres, user_pace } = action.payload;
            return Object.assign({}, state, {user_preferences: {
                user_genres: user_genres,
                user_pace: user_pace
            }});

        case ADD_SONG:
            let addCopy = state.playlists.slice()
            addCopy[state.current_index].tracks.push(action.payload);
            return Object.assign({}, state, {playlists: addCopy} )

        case CHANGE_INDEX:
            return Object.assign({}, state, { current_index: action.payload })
        
        case ADD_PLAYLIST:
            let newPlaylistCopy = state.playlists.slice();
            return Object.assign({}, state, { playlists: [...newPlaylistCopy, action.payload]})

        case REMOVE_PLAYLIST:
            let removePlaylistCopy = state.playlists.slice();
            removePlaylistCopy.splice(action.payload, 1)

            return Object.assign({}, state, {playlists: removePlaylistCopy})
        case LOGOUT: 
            return Object.assign({}, state, {})
        
        default:
            return state;
    }
}