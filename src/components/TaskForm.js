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
        if (this.props.itemEditing && this.props.itemEditing.id) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        } else if (nextProps && !nextProps.itemEditing) {
            this.onClear();
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
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            // id: '',
            name: '',
            status: false
        });
    }

    render() {

        var { id } = this.state;

        if (!this.props.isDisplayForm) return '';

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
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
