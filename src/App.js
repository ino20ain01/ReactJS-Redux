import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import TaskForm from "./components/TaskForm";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import * as actions from './actions'
import { connect } from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sort: {
                by: '',
                value: 1
            }
        }
        this.onGenerateData = this.onGenerateData.bind(this);
        this.onShowForm = this.onShowForm.bind(this);
        // this.onCloseForm = this.onCloseForm.bind(this);
    }

    onGenerateData() {
        var tasks = [
            {
                id: Math.random() + '-' + Math.random(),
                name: 'Học React JS',
                status: true
            },
            {
                id: Math.random() + '-' + Math.random(),
                name: 'Học Node JS',
                status: true
            },
            {
                id: Math.random() + '-' + Math.random(),
                name: 'Học GraphQL',
                status: false
            }
        ];
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onToogleForm = () => {
        // if (this.state.isDisplayForm && this.state.taskEditing) {
        //     this.setState({
        //         isDisplayForm: true,
        //         taskEditing: null
        //     });
        // } else {
        //     this.setState({
        //         isDisplayForm: !this.state.isDisplayForm,
        //         taskEditing: null
        //     });
        // }
        this.props.onToggleForm();
    }

    onShowForm()  {
        this.setState({
            isDisplayForm: true
        });
    }

    // onCloseForm()  {
    //     this.setState({
    //         isDisplayForm: false
    //     });
    // }

    // onUpdateStatus = (id) => {
    //     var { tasks } = this.state;
    //     var index = this.findIndex(id);
    //     if (index !== -1) {
    //         tasks[index].status = !tasks[index].status;
    //         this.setState({
    //             tasks: tasks
    //         });
    //         if (typeof(Storage) !== "undefined") {
    //             localStorage.setItem('tasks', JSON.stringify(tasks));
    //         }
    //     }
    // }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            });
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
        this.onCloseForm();
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        });
    }

    onSort = (sort) => {
        this.setState({
            sort: sort
        });
    }

    findIndex = (id) => {
        var { tasks } = this.state,
            result = -1;
        tasks.forEach(function (task, index) {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    render() {

        var {
            // isDisplayForm,
            taskEditing,
            // filter,
            // keyword,
            // sort
        } = this.state;
        let { isDisplayForm } = this.props;
        // if (filter) {
        //     if (filter.name) {
        //         tasks = tasks.filter((task) => {
        //            return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
        //     tasks = tasks.filter((task) => {
        //         if (filter.status === -1) {
        //             return tasks;
        //         } else {
        //             return task.status === (filter.status === 1 ? true : false);
        //         }
        //     });
        // }
        // if (keyword) {
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        //     });
        // }
        // if (sort.by === 'name') {
        //     tasks.sort((a, b) => {
        //         if (a.name > b.name) return sort.value;
        //         else if (a.name < b.name) return -sort.value;
        //         else return 0;
        //     });
        // }
        // if (sort.by === 'status') {
        //     tasks.sort((a, b) => {
        //         if (a.status > b.status) return -sort.value;
        //         else if (a.status < b.status) return sort.value;
        //         else return 0;
        //     });
        // }
        var elmTaskForm = isDisplayForm ? <TaskForm
                                            onCloseForm={ this.onCloseForm }
                                            task={ taskEditing }
                                            /> : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>QUẢN LÝ CÔNG VIỆC</h1>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        {/* FORM */}
                        { elmTaskForm }
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button
                            className="btn btn-primary"
                            onClick={ this.onToogleForm }
                        >
                            <i className="fa fa-plus"></i> Thêm công việc
                        </button>&nbsp;
                        {/*<button*/}
                            {/*className="btn btn-warning"*/}
                            {/*onClick={ this.onGenerateData }>*/}
                            {/*<i className="fa fa-hand-spock-o"></i> Generate Data*/}
                        {/*</button>*/}

                        {/* SEARCH - SORT */}
                        <Filter
                            onSearch={ this.onSearch }
                            onSort={ this.onSort }
                        />
                        {/* TASK LIST */}
                        <TaskList
                            onDelete={ this.onDelete }
                            onUpdate={ this.onUpdate }
                            // onUpdateStatus={ this.onUpdateStatus }
                            onFilter={ this.onFilter }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
