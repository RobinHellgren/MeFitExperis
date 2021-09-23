import { ACTION_REGISTRATION_ATTEMPTING, ACTION_REGISTRATION_FAIL, ACTION_REGISTRATION_SUCCESS } from "../Actions/registrationAction"

const initalState = {
    registrationAttempting: false,
    registrationError: ''

}

export const registrationReducer = (state = initalState, action) => {

    switch (action.type) {
        case ACTION_REGISTRATION_ATTEMPTING:
            return {
                ...state,
                registrationAttempting: true,
                registrationError: ''
            }

        case ACTION_REGISTRATION_SUCCESS:
            return {
                ...initalState
            }

        case ACTION_REGISTRATION_FAIL:
            return {
                ...state,
                registrationAttempting: false,
                registrationError: action.payload
            }

        default:
            return state;
    }
}