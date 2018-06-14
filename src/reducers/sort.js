import * as types from './../constants/ActionTypes'

let initialState = {
    by: 'name',
    value: 1, //1: tăng, -1: giảm
};

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {...action.sort};
        default: return state;
    }
}

export default myReducer;