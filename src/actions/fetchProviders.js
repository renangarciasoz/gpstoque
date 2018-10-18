import axios from 'axios';
import { SET_PROVIDERS } from './actionTypes';

export function setProviders(providers) {
    return {
        type: SET_PROVIDERS,
        providers
    }   
}

export function fetchProviders() {

    return dispatch => {
    
        return axios.get('https://gpstoque-api.herokuapp.com/provider')
            .then(data => {
                dispatch(setProviders(data.data))
            })
    }
}