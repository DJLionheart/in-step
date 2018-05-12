import axios from 'axios'

const initialState = {
    search_input: '',
    search_type: 'bpm',
    results: [],
    sortBy: 'bpm',
    sortDirection: 'asc',
    invertDirection: {'asc': 'desc', 'desc': 'asc'}
}

const FULFILLED = '_FULFILLED';

const HANDLE_SORT = 'HANDLE_SORT'
    , SORT_RESULTS = 'SORT_RESULTS'
    , GET_RESULTS = 'GET_RESULTS'
    , GET_INPUT = 'GET_INPUT'
    , GET_TYPE = 'GET_TYPE';

const {
     REACT_APP_SEARCH
} = process.env;

export function sort_results(sort) {
    return {
        type: SORT_RESULTS,
        payload: sort
    }
}

export function reduxSort(column, direction) {
    return {
        type: HANDLE_SORT,
        payload: {
            sortBy: column,
            sortDirection: direction
        }
    }
}

export function get_input(e) {
    return {
        type: GET_INPUT,
        payload: e.target.value
    }
}

export function get_type(e) {
    return {
        type: GET_TYPE,
        payload: e.target.value
    }
}

export function get_results(search_type, search_input) {

    let results = axios.get(`${REACT_APP_SEARCH}?type=${ search_type }&search=${ search_input }`).then( res => {
        console.log('Search results: ', res.data)

        return res.data
    }).catch( err => console.log('DB search error: ', err))
    
    return {
        type: GET_RESULTS,
        payload: results
    }
}

export default function search(state = initialState, action) {
    switch( action.type ) {

        case SORT_RESULTS:
            const { sortBy, sortDirection, invertDirection } = state;
            let direction = '';
            sortBy === action.payload ? direction = invertDirection[sortDirection] : direction = 'asc'

            return Object.assign({}, state, {sortBy: action.payload, sortDirection: direction});

        case HANDLE_SORT:
            return Object.assign({}, state, {sortBy: action.payload.sortBy, sortDirection: action.payload.sortDirection})

        case GET_INPUT:
            return Object.assign({}, state, {search_input: action.payload});

        case GET_TYPE:
            return Object.assign({}, state, {search_type: action.payload});

        case GET_RESULTS + FULFILLED:
            return Object.assign({}, state, {results: action.payload});

        default:
            return state
    }
}