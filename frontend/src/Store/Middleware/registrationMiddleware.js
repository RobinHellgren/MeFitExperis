import { RegisterAPI } from "../../Components/API/RegisterAPI"
import { ACTION_REGISTRATION_ATTEMPTING, ACTION_REGISTRATION_SUCCESS, registrationErrorAction, registrationSuccessAction } from "../Actions/registrationAction"
import { loginAttemptAction } from "../Actions/loginAction"

export const registrationMiddleware = ({ dispatch }) => next => action => {
    next(action)

    if (action.type === ACTION_REGISTRATION_ATTEMPTING) {
        RegisterAPI.register(action.payload)
            .then(user => {
                dispatch(registrationSuccessAction(user))
            })
            .catch(error => {
                dispatch(registrationErrorAction(error.message))
            })
    }

    if (action.type === ACTION_REGISTRATION_SUCCESS) {
        dispatch(loginAttemptAction({ "username": action.payload.username, "password": action.payload.password }))
    }


}