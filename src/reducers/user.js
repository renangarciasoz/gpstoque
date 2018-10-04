import { SET_USER_INFOS } from '../actions/actionTypes';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case SET_USER_INFOS:
            return action.userInfos;
        default: return state;
    }
}