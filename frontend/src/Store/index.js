import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./Reducers";
import Middleware from "./Middleware";

export default createStore(
    appReducer , composeWithDevTools(Middleware)
)