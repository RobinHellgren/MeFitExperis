import { ACTION_SESSION_SET, ACTION_SESSION_CLEAR, ACTION_SESSION_LOGOUT } from "../Actions/sessionAction"

//add profile
const initialState = {
    firstName: '',
    lastName: "",
    email: "",
    username: "",
    fullName: "",
    emailVerified: "",
    token: "",
    weight: "",
    height: "",
    medicalConditions: "",
    disabilities: "",
    fitnessEvaluation: "",
    goals: [],
    loggedIn: false

}

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTION_SESSION_SET:
            return {
                ...action.payload,
                loggedIn: true
            }

        case ACTION_SESSION_CLEAR:
            return {
                ...initialState
            }
        case ACTION_SESSION_LOGOUT:
            return {
                ...state,
                loggedIn: false
            }

        default:
            return state;
    }
}