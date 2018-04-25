import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import user from './user';
import search from './search';

const rootReducer = combineReducers({
    user,
    search
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));