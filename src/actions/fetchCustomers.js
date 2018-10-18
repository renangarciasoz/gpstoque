import axios from 'axios';
import { SET_CUSTOMERS } from './actionTypes';

export function setCustomers(customers) {
    return {
        type: SET_CUSTOMERS,
        customers
    }   
}

export function fetchCustomers() {

    return dispatch => {
    
        return axios.get('https://gpstoque-api.herokuapp.com/customer')
            .then(data => {
                dispatch(setCustomers(data.data))
            })
    }
}