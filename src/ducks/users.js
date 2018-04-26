import axios from 'axios';

const initialState = {
    user: {}, 
    user_preferences: {
        user_genre: [],
        user_pace: ''
    },
    favorite_tracks: []

}

const FULFILLED = '_FULFILLED';

const GET_USER = 'GET_USER'
    , GET_PREFERENCES = 'GET_PREFERENCES'
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
            
        case LOGOUT: 
            return Object.assign({}, state, {})
        
        default:
            return state;
    }
}