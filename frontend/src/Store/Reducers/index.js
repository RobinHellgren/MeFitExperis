import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { sessionReducer } from "./sessionReducer";
import { registrationReducer } from "./registrationReducer";

const appReducer = combineReducers({
    loginReducer,
    sessionReducer,
    registrationReducer
})

export default appReducer;