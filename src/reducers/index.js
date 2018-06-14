import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import search from './search';

const myReducer = combineReducers({
    tasks, // myReducer: myReducer
    isDisplayForm, // isDisplayForm: isDisplayForm
    itemEditing, // itemEditing: itemEditing
    filterTable, // filterTable: filterTable
    search // search: search
});

export default myReducer;