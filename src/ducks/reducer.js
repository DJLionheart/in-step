
const initialState = {
    user_name: '',
    user_profile: '', 
    selector: 'BPM',
    user_preferences: {
        user_genre: [],
        user_pace: ''
    },
    favorite_tracks: []

}

const GET_USER_DETAILS = 'GET_USER_DETAILS'
    , CHANGE_SELECTOR = 'CHANGE_SELECTOR'
    , GET_PREFERENCES = 'GET_PREFERENCES';


export function getUserPreferences(genreList, userPace) {
    return {
        type: GET_PREFERENCES,
        payload: {
            user_genre: genreList,
            user_pace: userPace 
        }
    }
}


export default function reducer(state = initialState, action) {
    switch( action.type ) {

        case GET_USER_DETAILS:
            const { user_name, user_profile } = action.payload;
            return Object.assign({}, state, {user_name: user_name, user_profile: user_profile});

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