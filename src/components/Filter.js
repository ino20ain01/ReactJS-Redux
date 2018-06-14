import React, {Component} from 'react';
import Search from './Search';
import Sort from "./Sort";
class Filter extends Component {

    render() {
        return (
            <div className="row mt-2">
                {/* SEARCH */}
                <Search
                    // onSearch={ this.props.onSearch }
                />
                {/* SORF */}
                <Sort onSort={ this.props.onSort } />
            </div>
        );
    }
}

export default Filter;
