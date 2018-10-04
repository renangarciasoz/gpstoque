import { SET_REQUESTS } from "../actions/actionTypes";

export default (state = [], action = {}) => {
    switch(action.type) {
        case SET_REQUESTS:
            return action.requests
        default:
            return state;
    }
}