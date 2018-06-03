import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
        } else if (nextProps && !nextProps.task) {
            this.setState({
                id: '',
                name: '',
                status: false
            });
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange(e) {
        var target = e.target,
            name = target.name,
            value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // this.props.onSubmit(this.state);
        this.props.onAddTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
    }

    render() {

        var { id } = this.state;

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { id !== '' ? 'Cập nhật công việc' : 'Thêm công việc' }
                        <span
                            role="button"
                            className="fa fa-times-circle pull-right"
                            onClick={ this.onCloseForm }
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label htmlFor="">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={ this.state.name }
                                onChange={ this.onChange }
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Trạng thái:</label>
                            <select
                                name="status"
                                id=""
                                className="form-control"
                                value={ this.state.status }
                                onChange={ this.onChange }
                            >
                                <option value={true}>Kích hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                        </div>
                        <div className="form-group pull-right">
                            <button type="submit" className="btn btn-success"><i className="fa fa-plus-circle"></i> Lưu</button>&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={ this.onClear }
                            >
                                <i className="fa fa-remove"></i> Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: (task) => {
            dispatch(actions.addTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
