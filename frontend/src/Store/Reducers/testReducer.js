import {TEST_ACTION_SET_DATA } from "../Actions/testActions"

const initialState = {
    data: ""
}

export const testReducer = (state = initialState, action) => {
    switch(action.type){
        case TEST_ACTION_SET_DATA:
            console.log(state)
            console.log(action.payload)
            return {
                ...state,
                data: action.payload
            };
        default:
            return state
    }
}