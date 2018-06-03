import React, {Component} from 'react';
import TaskItem from "./TaskItem";
import { connect } from 'react-redux';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (e) => {
        var target = e.target,
            name = target.name,
            value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks } = this.props,
            { filterName, filterStatus } = this.state,
            elmTask = [];
        if (tasks) {
            elmTask = tasks.map((task, index) => {
                return <TaskItem
                    key={ task.id + '-' + index}
                    task={ task } index={ index }
                    // onUpdateStatus={ this.props.onUpdateStatus }
                    onDelete={ this.props.onDelete }
                    onUpdate={ this.props.onUpdate }
                />
            });
        }
        return (
            <div className="row mt-2">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-responsive table-hover">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="filterName"
                                    value={ filterName }
                                    onChange={ this.onChange }
                                />
                            </td>
                            <td>
                                <select
                                    name="filterStatus"
                                    className="form-control"
                                    value={ filterStatus }
                                    onChange={ this.onChange }
                                >
                                    <option value={-1}>Tất cả</option>
                                    <option value={0}>Ẩn</option>
                                    <option value={1}>Kích hoạt</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        { elmTask }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapsStateToProps, null)(TaskList);
