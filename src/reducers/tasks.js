import * as types from './../constants/ActionTypes'

let initialState = [];

if (typeof(Storage) !== "undefined") {
    var data = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
    initialState = data;
}

let findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach(function (task, index) {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}

let myReducer = (state = initialState, action) => {
    let id = 0,
        index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            let task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (task.id) {
                index = findIndex(state, task.id);
                state[index] = task;
            } else {
                task.id = Math.random() + '-' + Math.random();
                state.push(task);
            }
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            // let cloneTask = {};
            index = findIndex(state, id);
            if (index !== -1) {
                // cloneTask = {...state[index]};
                // cloneTask.status = !cloneTask.status;
                // state[index] = cloneTask;

                state[index] = {
                    ...state[index],
                    status: !state[index].status
                };
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem('tasks', JSON.stringify(state));
                }
            }
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            if (index !== -1) {
                state.splice(index, 1);
                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem('tasks', JSON.stringify(state));
                }
            }
            return [...state];
        default: return state;
    }
}

export default myReducer;