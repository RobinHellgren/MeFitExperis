import { applyMiddleware } from "redux";
import { testMiddleware } from "./testMiddleware";

export default applyMiddleware(testMiddleware)