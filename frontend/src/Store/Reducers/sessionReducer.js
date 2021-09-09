import { ACTION_SESSION_SET } from "../Actions/sessionAction"

const initialState = {
    token: "",
    loggedIn: false
}

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTION_SESSION_SET:
            return {
                token: action.payload,
                loggedIn: true
            }
            default:
                return state;
    }
}