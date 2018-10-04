import axios from 'axios';
import { SET_USER_INFOS } from './actionTypes';

export function setUserInfos(userInfos) {
    return {
        type: SET_USER_INFOS,
        userInfos
    };
}

export function fetchUser() {
    return (dispatch, getState) => {
        const userID = getState().auth.user._id;

        return axios.get(`https://gpstoque-api.herokuapp.com/user/${userID}`)
            .then(data => {
                dispatch(setUserInfos(data.data))
            })
    }
}