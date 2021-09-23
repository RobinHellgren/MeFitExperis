import { ACTION_LOGIN_ATTEMPTING, ACTION_LOGIN_FAIL, ACTION_LOGIN_SUCCESS } from "../Actions/loginAction"

const initalState = {
    loginAttempting: false,
    loginError: ''

}

export const loginReducer = (state = initalState, action) => {

    switch (action.type) {
        case ACTION_LOGIN_ATTEMPTING:
            return {
                ...state,
                loginAttempting: true,
                loginError: ''
            }

        case ACTION_LOGIN_SUCCESS:
            return {
                ...initalState
            }

        case ACTION_LOGIN_FAIL:
            return {
                ...state,
                loginAttempting: false,
                loginError: action.payload
            }

        default:
            return state;
    }
}