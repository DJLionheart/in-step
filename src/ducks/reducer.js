
const initialState = {
    user_name: '',
    user_profile: '', 
    selector: 'BPM',
    user_preferences: {
        genre_list: [],
        user_pace: []
    }

}

const GET_USER_DETAILS = 'GET_USER_DETAILS'
    , CHANGE_SELECTOR = 'CHANGE_SELECTOR'
    , GET_PREFERENCES = 'GET_PREFERENCES';
    // , CREATE_PLAYLIST = 'CREATE_PLAYLIST'
    // , CLEAR_PLAYLIST = 'CLEAR_PLAYLIST'
    // , DELETE_PLAYLIST = 'DELETE_PLAYLIST'
    // , ADD_TRACK = 'ADD_TRACK'
    // , REMOVE_TRACK = 'REMOVE_TRACK';


export function GET_PREFERENCES(genre_list, user_pace) {
    return {
        
    }
}


export default function reducer(state = initialState, action) {
    switch( action.type ) {

        case GET_USER_DETAILS:
            const { user_name, user_profile } = action.payload;
            //return { ...state, user_name: user_name, user_profile: user_profile}
            return Object.assign({}, state, {user_name: user_name, user_profile: user_profile});

        case CHANGE_SELECTOR:
            //return { ...state, selector: action.payload}
            return Object.assign({}, state, {selector: action.payload});

        case GET_PREFERENCES:
            const { genre_list, user_pace } = action.payload;
            //return { ...state, selector: action.payload}
            return Object.assign({}, state, {user_preferences: {
                genre_list: genre_list,
                user_pace: user_pace
            }});

        // case CREATE_PLAYLIST:
        //     return Object.assign({}, state, {user_playlists: [...state.user_playlists, {playlist_id: action.payload, playlist_name: 'New Playlist', tracks: []}]})
        
        // case DELETE_PLAYLIST:
        //     // Filter out the old playlist.
        //     let new_list = state.user_playlists.filter( playlist => playlist.playlist_id !== action.payload );
        //     return Object.assign({}, state, {user_playlists: new_list});

        // case ADD_TRACK:
        //     let { playlist_id, index, track } = action.payload;
            
        //     // Add selected track to the playlist matching playlist_id
        //     let updated_playlist = [...state.user_playlists[index].tracks, track];

        //     // Filter out the old version of the playlist
        //     let new_list = state.user_playlists.filter( playlist => playlist.playlist_id !== action.payload );

        //     return Object.assign({}, state, {user_playlists: [...new_list, updated_playlist]})
            
        default:
            return state;
    }
}