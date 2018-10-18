import { SET_PROVIDERS } from "../actions/actionTypes";

export default (state = [], action = {}) => {
    switch(action.type) {
        case SET_PROVIDERS:
            return action.providers
        default:
            return state;
    }
}