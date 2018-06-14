import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (e) => {
        var target = e.target,
            name = target.name,
            value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {

        var { keyword } = this.state;

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <span className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ this.onSearch }
                        >
                            <i className="fa fa-search"></i> Tìm
                        </button>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        value={ keyword }
                        name="keyword"
                        onChange={ this.onChange }
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: keyword => {
            dispatch(actions.searchTask(keyword));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
