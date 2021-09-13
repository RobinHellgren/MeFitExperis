import { LoginAPI }from "../../Components/LoginAPI"
import { ACTION_LOGIN_ATTEMPTING, ACTION_LOGIN_SUCCESS, loginErrorAction, loginSuccessAction } from "../Actions/loginAction"
import { sessionSetAction } from "../Actions/sessionAction"

export const loginMiddleware = ({ dispatch }) => next => action => {
    next(action)

    if (action.type === ACTION_LOGIN_ATTEMPTING) {
        LoginAPI.login(action.payload)
        .then(profile => {
            dispatch( loginSuccessAction(profile))
        })
        .catch(error => {
            dispatch(loginErrorAction(error.message))
        })
    }

    if(action.type === ACTION_LOGIN_SUCCESS){
        dispatch(sessionSetAction(action.payload))
    }


}