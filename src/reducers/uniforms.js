import { SET_UNIFORMS, SET_TYPEUNIFORMS } from "../actions/actionTypes";

export const uniforms = (state = [], action = {}) => {
    switch(action.type) {
        case SET_UNIFORMS:
            return action.uniforms
        default:
            return state;
    }
}

export const typeuniforms = (state = [], action = {}) => {
    switch(action.type) {
        case SET_TYPEUNIFORMS:
            return action.typeuniforms
        default:
            return state;
    }
}