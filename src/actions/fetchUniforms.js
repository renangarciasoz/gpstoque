import axios from 'axios';
import { SET_UNIFORMS, SET_TYPEUNIFORMS } from './actionTypes';

export function setUniforms(uniforms) {
    return {
        type: SET_UNIFORMS,
        uniforms
    }   
}

export function setTypeuniforms(typeuniforms) {
    return {
        type: SET_TYPEUNIFORMS,
        typeuniforms
    }   
}

export function fetchUniforms() {

    return dispatch => {
    
        return axios.get('https://gpstoque-api.herokuapp.com/uniform')
            .then(data => {
                dispatch(setUniforms(data.data))
            })
    }
}

export function fetchTypeuniforms() {

    return dispatch => {
    
        return axios.get('https://gpstoque-api.herokuapp.com/typeuniform')
            .then(data => {
                dispatch(setTypeuniforms(data.data))
            })
    }
}