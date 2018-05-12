import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { sessionReducer } from 'redux-react-session';

import users from './users';
import search from './search';

const reducer = combineReducers({
    session: sessionReducer,
    user_data: users,
    search: search
})

export default createStore(reducer, applyMiddleware(promiseMiddleware()));
// export default createStore(users, applyMiddleware(promiseMiddleware())); 