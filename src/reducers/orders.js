import { SET_ORDERS } from "../actions/actionTypes";

export default (state = [], action = {}) => {
    switch(action.type) {
        case SET_ORDERS:
            return action.orders
        default:
            return state;
    }
}