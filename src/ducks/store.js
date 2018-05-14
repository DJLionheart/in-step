import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { sessionReducer } from 'redux-react-session';

import users from './users';
import search from './search';
import modals from './modals';

// const persistConfig = {
//     key: 'root',
//     storage: storage
// }

const reducer = combineReducers({
    user_data: users,
    search: search,
    modals: modals
})

// const rootReducer = combineReducers({
//     user_data: users,
//     search: search
// }, applyMiddleware(promiseMiddleware()))

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer);
// export const persistor = persistStore(store)
export default createStore(reducer, applyMiddleware(promiseMiddleware()));
