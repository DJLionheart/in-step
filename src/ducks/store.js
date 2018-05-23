import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import users from './users';
import search from './search';
import modals from './modals';

const rootReducer = combineReducers({
    user_data: users,
    search: search,
    modals: modals
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware()));
// + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()