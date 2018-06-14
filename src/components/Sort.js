import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';

class Sort extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    render() {

        let { sort } = this.props;

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="btn-group">
                    <button type="button" className="btn btn-primary dropdown-toggle"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sắp xếp <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li onClick={ () => {this.onClick('name', 1)} }>
                            <a role="button">
                                <i className="fa fa-sort-alpha-asc"></i> Tên A-Z { sort.by === 'name' && sort.value === 1 ? <i className="fa fa-check"></i> : '' }
                            </a>
                        </li>
                        <li onClick={ () => {this.onClick('name', -1)} }>
                            <a role="button">
                                <i className="fa fa-sort-alpha-desc"></i> Tên Z-A { sort.by === 'name' && sort.value === -1 ? <i className="fa fa-check"></i> : '' }
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={ () => {this.onClick('status', 1)} }>
                            <a role="button">
                                Trạng thái kích hoạt { sort.by === 'status' && sort.value === 1 ? <i className="fa fa-check"></i> : '' }
                            </a>
                        </li>
                        <li onClick={ () => {this.onClick('status', -1)} }>
                            <a role="button">
                                Trạng thái ẩn { sort.by === 'status' && sort.value === -1 ? <i className="fa fa-check"></i> : '' }
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        sort: state.sort
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: sort => {
            dispatch(actions.sortTask(sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
