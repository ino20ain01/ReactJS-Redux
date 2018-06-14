import React, {Component} from 'react';
import Search from './Search';
import Sort from "./Sort";
class Filter extends Component {

    render() {
        return (
            <div className="row mt-2">
                {/* SEARCH */}
                <Search />
                {/* SORF */}
                <Sort />
            </div>
        );
    }
}

export default Filter;
