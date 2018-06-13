import * as types from './../constants/ActionTypes'

let initialState = {
    name: '',
    status: '',
    status: -1
}; // close form

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            console.log(action);
            return {...state};
        default: return state;
    }
}

export default myReducer;