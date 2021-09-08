import { applyMiddleware } from "redux";
import { testMiddleware } from "./testMiddleware";
import { loginMiddleware } from "./loginMiddleware";

export default applyMiddleware(testMiddleware, loginMiddleware)