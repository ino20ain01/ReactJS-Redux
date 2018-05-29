import React, {Component} from 'react';

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

export default Search;
