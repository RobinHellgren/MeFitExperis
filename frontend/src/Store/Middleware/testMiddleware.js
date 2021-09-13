
import keys from "../../keys"
import { testActionSet, TEST_ACTION_FETCH } from "../Actions/testActions"
const API_SERVER_CONNECTION_STRING = keys.REACT_APP_SERVER_URL
export const testMiddleware = ({dispatch}) => next => action => {
    next(action)
    switch(action.type){
        case TEST_ACTION_FETCH:
            fetch(API_SERVER_CONNECTION_STRING + "/test")
            .then(response => response.text())
            .then(text => {
                console.log("test response: " + text)
                dispatch(testActionSet(text))
            })
            .catch(error => {
                console.log(error)
                dispatch(testActionSet("Error getting resource"))
            })
            break;

        default:
            
    }
}