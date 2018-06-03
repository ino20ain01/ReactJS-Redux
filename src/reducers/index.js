import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';

const myReducer = combineReducers({
    tasks, // myReducer: myReducer
    isDisplayForm // isDisplayForm: isDisplayForm
});

export default myReducer;