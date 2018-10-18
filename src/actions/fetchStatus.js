import axios from 'axios';
import { SET_STATUS } from './actionTypes';

export function setStatus(status) {
    return {
        type: SET_STATUS,
        status
    }   
}

export function fetchStatus() {

    return dispatch => {
    
        return axios.get('https://gpstoque-api.herokuapp.com/status')
            .then(data => {
                dispatch(setStatus(data.data))
            })
    }
}