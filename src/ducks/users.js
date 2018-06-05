import { get, post, put } from 'axios';


const initialState = {
    user: {
        username: 'User'
    }, 
    user_preferences: {
        user_genres: ['None selected'],
        user_pace: 'None selected'
    },
    initialPrefsSaved: false,
    favorite_tracks: [],
    current_index: 0,
    indexMatrix: {},
    playlists: [],
    bpmCalc: {
        'Not sure': '?',
        '12:00': '130',
        '11:30': '135',
        '11:00': '140',
        '10:30': '145',
        '10:00': '150',
        '9:30': '155',
        '9:00': '160',
        '8:30': '165',
        '8:00': '170',
        '7:30': '175',
        '7:00': '180',
        '6:30': '185',
        '6:00': '190',
        '5:30': '195',
        '5:00': '200'
    }
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
    , APPLY_PREFS = 'APPLY_PREFS'
    , SAVE_INITIAL = 'SAVE_INITIAL';

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
    let playlistData = get(`${REACT_APP_PLAYLISTS}/${userid}`).then( res => {
        // console.log('Get playlists: ', res.data)
        return res.data
    }).catch(err => console.log('Error getting playlists: ', err))
    
    return {
        type: GET_PLAYLISTS,
        payload: playlistData
    }
}

export function get_favorites(userid) {
    let favoriteTracks = get(`${REACT_APP_FAVS}/${userid}`).then( res => {
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
    let preferences = get(`${REACT_APP_USERS}?userid=${userid}`).then( res => {
        // console.log('User preferences: ', res.data)
        return res.data
    })
    
    return {
        type: GET_PREFERENCES,
        payload: preferences
    }
}

export function post_user_preferences(userid, userGenrePrefs, user_pace) {
    let user_preferences = post(`/api/user_preferences?userid=${userid}`, {userGenrePrefs, user_pace}).then( res => {
        return res.data;
    }).catch(err => console.log('Something went wrong: ', err))

    return {
        type: POST_PREFERENCES,
        payload: user_preferences
    }
}

export function save_initial() {
    return {
        type: SAVE_INITIAL,
        payload: true
    }
}

export function put_user_preferences(userid, userGenrePrefs, user_pace) {
    let user_preferences = put(`/api/user_preferences?userid=${userid}`, {userGenrePrefs, user_pace}).then( res => {
        return res.data;
    }).catch(err => console.log('Something went wrong: ', err))

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
    
    switch( action.type ) {

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

            // console.log('Playlists saved to Redux: ', action.payload)
            // console.log('Index Matrix: ', matrix)
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

        case SAVE_INITIAL: 
            return Object.assign({}, state, {initialPrefsSaved: true});

        case PUT_PREFERENCES + FULFILLED:
            console.log('Put preferences fulfilled: ', action.payload)
            return Object.assign({}, state, {
                user_preferences: action.payload});
        
        case CHANGE_INDEX:
            return Object.assign({}, state, { current_index: action.payload })
        
        case LOGOUT: 
            return Object.assign(action.payload, state, initialState)
        
        case 'persist/REHYDRATE':
            return { ...state, persistedState: action.payload };

        default:
            return state;
    }
}