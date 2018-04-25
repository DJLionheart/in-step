import axios from 'axios';

const initialState = {
    user: {}, 
    // selector: 'BPM',
    user_preferences: {
        user_genre: [],
        user_pace: ''
    },
    favorite_tracks: []

}

const GET_USER = 'GET_USER'
    , CHANGE_SELECTOR = 'CHANGE_SELECTOR'
    , GET_PREFERENCES = 'GET_PREFERENCES';

export function getUser() {
    let userData = axios.get('/api/auth/me').then( res => {
        return res.data
    })
    return {
        type: GET_USER,
        payload: userData
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


export default function user(state = initialState, action) {
    switch( action.type ) {

        case GET_USER + 'FULFILLED':
            return Object.assign({}, state, {user: action.payload});

        case CHANGE_SELECTOR:
            return Object.assign({}, state, {selector: action.payload});

        case GET_PREFERENCES:
            const { user_genre, user_pace } = action.payload;
            return Object.assign({}, state, {user_preferences: {
                user_genre: user_genre,
                user_pace: user_pace
            }});
            
        default:
            return state;
    }
}