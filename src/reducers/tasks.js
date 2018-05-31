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
        case types.ADD_TASK:
            let newTasks = {
                id: Math.random() + '-' + Math.random(),
                name: action.task.name,
                status: action.task.status
            }
            state.push(newTasks);
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];
        default: return state;
    }
}

export default myReducer;