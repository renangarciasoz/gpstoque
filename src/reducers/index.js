import { combineReducers } from 'redux';

import auth from './auth';
import devolutions from './devolutions';
import user from './user';

export const Reducers = combineReducers({
    user,
    devolutions,
    auth
});