import axios from 'axios';
import { SET_ORDERS } from './actionTypes';

export function setOrders(orders) {
    return {
        type: SET_ORDERS,
        orders
    }   
}

export function fetchOrders() {

    return dispatch => {
    
        return axios.get('https://gpstoque-api.herokuapp.com/order')
            .then(data => {
                dispatch(setOrders(data.data))
            })
    }
}