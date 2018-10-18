import { SET_STATUS } from "../actions/actionTypes";

export default (state = [], action = {}) => {
    switch(action.type) {
        case SET_STATUS:
            return action.status
        default:
            return state;
    }
}