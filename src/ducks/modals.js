const initialState = {
    q_alert: false,
    lastPlaylist: false,
    removePlaylist: false,
    clearTracks: false,
    renamePlaylist: false,
    createPlaylist: false,
    tooManyPl: false,
    sharePl: false,
    notOnSpotify: false,
    youTubeFrame: false,
    notOnYoutube: false,
    resetPrefs: false,
}

const HANDLE_MODAL = 'HANDLE_MODAL';

export function handle_modal(modal, bool) {
    return {
        type: HANDLE_MODAL,
        payload: {
            modal,
            bool
        }
    }
}

export default function search(state = initialState, action) {
    switch( action.type ) {

        case HANDLE_MODAL:
            return Object.assign({}, state, {[action.payload.modal]: action.payload.bool});

        case 'persist/REHYDRATE':
            return { ...state, persistedState: action.payload };
        
        default:
            return state
    }
}