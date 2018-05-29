import * as types from './../constants/ActionTypes'

let initialState = [];

if (typeof(Storage) !== "undefined") {
    var data = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    initialState = data;
}

let myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        default: return state;
    }
}

export default myReducer;