import { combineReducers } from "redux";
import { testReducer } from "./testReducer";
import { loginReducer } from "./loginReducer";
import { sessionReducer } from "./sessionReducer";

const appReducer = combineReducers({
    loginReducer,
    sessionReducer,
    testData: testReducer
})

export default appReducer;