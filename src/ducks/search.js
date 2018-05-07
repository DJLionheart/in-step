const initialState = {
    sortBy: 'bpm',
    sortDirection: 'asc',
    invertDirection: {'asc': 'desc', 'desc': 'asc'}
}

 const HANDLE_SORT = 'HANDLE_SORT';

export function reduxSort(column, direction) {
    return {
        type: HANDLE_SORT,
        payload: {
            sortBy: column,
            sortDirection: direction
        }
    }
}

export default function search(state = initialState, action) {
    switch( action.type ) {

        case HANDLE_SORT:
            return Object.assign({}, state, {sortBy: action.payload.sortBy, sortDirection: action.payload.sortDirection})

        default:
            return state
    }
}