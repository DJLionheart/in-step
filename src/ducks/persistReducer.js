import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import search from './search';
import users from './users';

const rootPersistConfig = {
    key: 'root',
    storage: storage
}