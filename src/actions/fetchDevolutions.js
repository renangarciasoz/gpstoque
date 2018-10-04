import axios from 'axios';
import { SET_DEVOLUTIONS } from './actionTypes';

export function setDevolutions(devolutions) {
    return {
        type: SET_DEVOLUTIONS,
        devolutions
    }   
}

export function fetchDevolutions() {
    return dispatch => {
        axios.get('https://gpstoque-api.herokuapp.com/devolution')
            .then(data => {
                dispatch(setDevolutions(data.data))
            })
    }
}