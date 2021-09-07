import { combineReducers } from "redux";
import { testReducer } from "./testReducer";
import { loginReducer } from "./loginReducer";

const appReducer = combineReducers({
    loginReducer,
    testData: testReducer
})

export default appReducer;