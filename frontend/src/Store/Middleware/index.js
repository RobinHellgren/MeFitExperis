import { applyMiddleware } from "redux";
import { loginMiddleware } from "./loginMiddleware";
import { sessionMiddleware } from "./sessionMiddleware";
import { registrationMiddleware } from "./registrationMiddleware";

export default applyMiddleware(loginMiddleware, sessionMiddleware, registrationMiddleware)