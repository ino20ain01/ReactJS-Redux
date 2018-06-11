import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions'

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        this.props.onCloseForm();
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }

    render() {

        var { task, index } = this.props;

        return (
            <tr>
                <td>{ ++index }</td>
                <td>
                    { task.name }
                </td>
                <td className="text-center">
                    <label
                        role="button"
                        className={ task.status ? 'label label-success' : 'label label-danger' }
                        onClick={ this.onUpdateStatus }
                    >
                        { task.status ? 'Kích hoạt' : 'Ẩn' }
                    </label>
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={ this.onUpdate }
                    >
                        <i className="fa fa-edit"></i> Sửa
                    </button>
                    &nbsp;
                    <button onClick={ this.onDelete } type="button" className="btn btn-danger btn-sm">
                        <i className="fa fa-remove"></i> Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: id => {
            dispatch(actions.updateStatus(id));
        },
        onDelete: id => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
