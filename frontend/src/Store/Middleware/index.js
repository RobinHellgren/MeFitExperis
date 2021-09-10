import { applyMiddleware } from "redux";
import { testMiddleware } from "./testMiddleware";
import { loginMiddleware } from "./loginMiddleware";
import { sessionMiddleware } from "./sessionMiddleware";
import { registrationMiddleware } from "./registrationMiddleware";

export default applyMiddleware(testMiddleware, loginMiddleware, sessionMiddleware, registrationMiddleware)