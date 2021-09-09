import { applyMiddleware } from "redux";
import { testMiddleware } from "./testMiddleware";
import { loginMiddleware } from "./loginMiddleware";
import { sessionMiddleware } from "./sessionMiddleware";

export default applyMiddleware(testMiddleware, loginMiddleware, sessionMiddleware)