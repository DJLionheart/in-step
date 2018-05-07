import axios from 'axios';

const initialState = {
    user: {}, 
    user_preferences: {
        user_genre: [],
        user_pace: ''
    },
    favorite_tracks: [],
    current_index: 0,
    playlists: [
        {name: 'Playlist 1', tracks: [
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
    , ADD_SONG = 'ADD_SONG'
    , REMOVE_SONG = 'REMOVE_SONG'
    , CHANGE_INDEX = 'CHANGE_INDEX'
    , ADD_PLAYLIST = 'ADD_PLAYLIST'
    , REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
    , LOGOUT = 'LOGOUT';

export function getUser() {
    let userData = axios.get('/api/auth/me').then( res => {
        return res.data
    })

    return {
        type: GET_USER,
        payload: userData
    }
}

export function add_song(id) {
    return {
        type: ADD_SONG,
        payload: id
    }
}

export function remove_song(id) {
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


export function getUserPreferences(genreList, userPace) {
    return {
        type: GET_PREFERENCES,
        payload: {
            user_genre: genreList,
            user_pace: userPace 
        }
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
            
        case GET_USER + FULFILLED:
            return Object.assign({}, state, {user: action.payload});


        case GET_PREFERENCES:
            const { user_genre, user_pace } = action.payload;
            return Object.assign({}, state, {user_preferences: {
                user_genre: user_genre,
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