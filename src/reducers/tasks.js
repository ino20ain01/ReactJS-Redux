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
        case types.UPDATE_STATUS_TASK:
                let id = action.id;
                // let cloneTask = {};
                let index = findIndex(state, id);
                if (index !== -1) {
                    // cloneTask = {...state[index]};
                    // cloneTask.status = !cloneTask.status;
                    // state[index] = cloneTask;

                    state[index] = {
                        ...state[index],
                        status: state[index].status
                    };
                    console.log(state[index]);
                    if (typeof(Storage) !== "undefined") {
                        localStorage.setItem('tasks', JSON.stringify(state));
                    }
                }
            return [...state];
        default: return state;
    }
}

export default myReducer;