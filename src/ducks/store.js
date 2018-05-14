import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import { sessionReducer } from 'redux-react-session';

import users from './users';
import search from './search';
import modals from './modals';
// import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     stateReconciler: autoMergeLevel2
// }

const rootReducer = combineReducers({
    user_data: users,
    search: search,
    modals: modals
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(persistedReducer, applyMiddleware(promiseMiddleware, logger));

// const persistor = persistStore(store);

// export default { store, persistor };

// const createAppStore = () => {
//     let store = createStore(persistedReducer, applyMiddleware(promiseMiddleware()))
//     let persistor = persistStore(store)
//     return { store, persistor }
// }

// export default createAppStore;
// const configureStore = () => {
//     const store = createStore(persistedReducer, applyMiddleware(promiseMiddleware()))
//     const persistor = persistStore(store)
//     return { persistor, store }
// }

// export default configureStore;
// export const store = createStore(persistedReducer, applyMiddleware(promiseMiddleware()));
// export const persistor = persistStore(store);

export default createStore(rootReducer, applyMiddleware(promiseMiddleware()));
// export default createStore(persistedReducer, applyMiddleware(promiseMiddleware()));

// + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()