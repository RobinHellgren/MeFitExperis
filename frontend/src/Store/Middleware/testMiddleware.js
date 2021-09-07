import { testActionSet, TEST_ACTION_FETCH } from "../Actions/testActions"
const API_SERVER_CONNECTION_STRING = "http://localhost:5000"
export const testMiddleware = ({dispatch}) => next => action => {
    next(action)
    switch(action.type){
        case TEST_ACTION_FETCH:
           /* fetch(API_SERVER_CONNECTION_STRING + "/test")
            .then(response => {
                console.log(response)
                dispatch(testActionSet(response))
            })
            .catch(error => {
                dispatch(testActionSet(error))
            })
            break;

        default:*/
            
    }
}