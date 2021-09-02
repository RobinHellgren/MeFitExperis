import { combineReducers } from "redux";
import { testReducer } from "./testReducer";

const appReducer = combineReducers({
    testData: testReducer
})

export default appReducer;