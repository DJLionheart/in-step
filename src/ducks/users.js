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
    , PUT_PREFERENCES = 'PUT_PREFERENCES'
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
        type: PUT_PREFERENCES,
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
            return Object.assign({}, state, {
                user_preferences: action.payload})
            
        case GET_PLAYLISTS + FULFILLED:
            let matrix = {};
            action.payload.forEach( playlist => {
                const { playlist_id, playlist_index } = playlist 
                matrix[playlist_index] = playlist_id;
            })

            console.log('Playlists saved to Redux: ', action.payload)
            console.log('Index Matrix: ', matrix)
            return Object.assign({}, state, { playlists: action.payload, indexMatrix: matrix })

        case GET_FAVORITES + FULFILLED:
            console.log('Favorites saved to redux: ', action.payload)
            return Object.assign({}, state, { favorite_tracks: action.payload })

        case GET_PREFERENCES + FULFILLED:
            console.log('Preferences saved to Redux: ', action.payload)
            return Object.assign({}, state, {
                user_preferences: action.payload})

        case POST_PREFERENCES + FULFILLED:
            console.log('Post preferences fulfilled: ', action.payload)
            return Object.assign({}, state, {
                user_preferences: action.payload});

        case PUT_PREFERENCES + FULFILLED:
            console.log('Put preferences fulfilled: ', action.payload)
            return Object.assign({}, state, {
                user_preferences: action.payload});
        
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