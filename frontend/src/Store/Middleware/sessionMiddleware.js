import { ACTION_SESSION_INIT, ACTION_SESSION_SET, ACTION_SESSION_CLEAR, ACTION_SESSION_LOGOUT, sessionSetAction, sessionClearAction } from "../Actions/sessionAction"

export const sessionMiddleware = ({ dispatch }) => next => action => {
    next(action)

    if (action.type === ACTION_SESSION_INIT) {
        const storedSession = localStorage.getItem('token');
        if (!storedSession) {
            return;
        }

        const session = JSON.parse(storedSession);

        dispatch(sessionSetAction(session))
    }

    if (action.type === ACTION_SESSION_SET) {
        //todo store in cookies instead
        localStorage.setItem('token', JSON.stringify(action.payload))
    }

    if (action.type === ACTION_SESSION_CLEAR) {
        localStorage.removeItem('token')
    }

    if (action.type === ACTION_SESSION_LOGOUT) {
        dispatch(sessionClearAction())
    }

}