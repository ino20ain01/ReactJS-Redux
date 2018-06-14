import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import TaskForm from "./components/TaskForm";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import * as actions from './actions'
import { connect } from 'react-redux';

class App extends Component {

    // toggle redux
    onToogleForm = () => {
        let {itemEditing } = this.props;
        if (itemEditing && itemEditing.id) {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
           id: '',
           name: '',
           status: false
        });
    }

    render() {

        let { isDisplayForm } = this.props; // is display form in redux
        return (
            <div className="container">
                <div className="text-center">
                    <h1>QUẢN LÝ CÔNG VIỆC</h1>
                </div>
                <div className="row">
                    <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                        {/* FORM */}
                        <TaskForm />
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button
                            className="btn btn-primary"
                            onClick={ this.onToogleForm }
                        >
                            <i className="fa fa-plus"></i> Thêm công việc
                        </button>&nbsp;
                        {/* SEARCH - SORT */}
                        <Filter />
                        {/* TASK LIST */}
                        <TaskList />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearTask: task => {
            dispatch(actions.editTask(task));
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
