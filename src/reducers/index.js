import { combineReducers } from 'redux';

import auth from './auth';
import customers from './customers';
import devolutions from './devolutions';
import orders from './orders';
import providers from './providers';
import requests from './requests';
import status from './status';
import {uniforms, typeuniforms} from './uniforms';
import user from './user';

export const Reducers = combineReducers({
    auth,
    customers,
    devolutions,
    orders,
    providers,
    requests,
    status,
    typeuniforms,
    uniforms,
    user
});