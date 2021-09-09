import { combineReducers } from "redux";
import { testReducer } from "./testReducer";
import { loginReducer } from "./loginReducer";
import { sessionReducer } from "./sessionReducer";
import { registrationReducer } from "./registrationReducer";

const appReducer = combineReducers({
    loginReducer,
    sessionReducer,
    registrationReducer,
    testData: testReducer
})

export default appReducer;