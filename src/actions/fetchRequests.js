import axios from 'axios';
import { SET_REQUESTS } from './actionTypes';

export function setRequests(requests) {
    return {
        type: SET_REQUESTS,
        requests
    }   
}

export function fetchRequests() {
    return dispatch => {
        
        return axios.get('https://gpstoque-api.herokuapp.com/request')
            .then(data => {
                dispatch(setRequests(data.data))
            })
    }
}