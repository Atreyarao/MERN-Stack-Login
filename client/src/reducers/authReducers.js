import {
    SET_CURRENT_USER,
    USER_LOADING,
    GET_ERRORS
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    laoding: false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            //console.log(action.payload);
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                laoding: true
            };
        default:
            return state;
    }
}