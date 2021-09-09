import { ACTION_SESSION_SET } from "../Actions/sessionAction"

export const sessionMiddleware = ({ dispath }) => next => action => {
    next(action)

    if(action.type === ACTION_SESSION_SET) {
        //todo store in cookies instead
        localStorage.setItem('token', JSON.stringify(action.payload))
    }
}