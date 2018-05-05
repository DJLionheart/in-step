import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import users from './users';
import search from './search';

const rootReducer = combineReducers({
    user_data: users,
    search: search
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware()));
// export default createStore(users, applyMiddleware(promiseMiddleware())); 