import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import users from './users';
import search from './search';
import modals from './modals';

const appReducer = combineReducers({
    user_data: users,
    search: search,
    modals: modals
})

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default createStore(rootReducer, applyMiddleware(promiseMiddleware()));
// + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()