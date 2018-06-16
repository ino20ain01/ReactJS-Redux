import React, {Component} from 'react';
import TaskItem from "./TaskItem";
import * as actions from "./../actions";
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
        let filter = {
                name: name === 'filterName' ? value : this.state.filterName,
                status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }

    render() {
        let {
            tasks,
            filterTable,
            keyword,
            sort
        } = this.props;

        let elmTask = [];

        if (tasks) {

            // Filter
            if (filterTable) {
                if (filterTable.name) {
                    tasks = tasks.filter((task) => {
                       return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
                    });
                }
                tasks = tasks.filter((task) => {
                    if (filterTable.status === -1) {
                        return tasks;
                    } else {
                        return task.status === (filterTable.status === 1 ? true : false);
                    }
                });
            }
            if (sort.by === 'name') {
                tasks.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
                    else if (a.name.toLowerCase() < b.name.toLowerCase()) return -sort.value;
                    else return 0;
                });
            }
            if (sort.by === 'status') {
                tasks.sort((a, b) => {
                    if (a.status > b.status) return -sort.value;
                    else if (a.status < b.status) return sort.value;
                    else return 0;
                });
            }

            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
            });

            elmTask = tasks.map((task, index) => {
                return <TaskItem
                    key={ task.id + '-' + index}
                    task={ task } index={ index }
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
                                    value={ filterTable.filterName }
                                    onChange={ this.onChange }
                                />
                            </td>
                            <td>
                                <select
                                    name="filterStatus"
                                    className="form-control"
                                    value={ filterTable.filterStatus }
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
        tasks: state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: filter => {
            dispatch(actions.filterTask(filter))
        }
    }
}

export default connect(mapsStateToProps, mapDispatchToProps)(TaskList);
