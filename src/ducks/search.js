const initialState = {
    options: {
        sortBy: 'bpm',
        sortDirection: 'asc'
    }
}

 const HANDLE_SORT = 'HANDLE_SORT';

export function reduxSort(sortBy, sortDirection) {
    return {
        type: HANDLE_SORT,
        payload: {
            sortBy: sortBy,
            sortDirection: sortDirection
        }
    }
}

export default function search(state = initialState, action) {
    switch( action.type ) {

        case HANDLE_SORT:
            return Object.assign({}, state, {searchOptions: action.payload})

        default:
            return state
    }
}