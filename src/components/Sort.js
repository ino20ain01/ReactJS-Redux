import React, {Component} from 'react';

class Sort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: 'name',
                value: 0
            }
        }
    }

    onClick = (sortBy, sortValue) => {

        var resultSort = new Promise((resolve, reject) => {
            if (sortBy && sortValue) {
                resolve('Success!');
            } else {
                reject('Not parameters');
            }
        });
        resultSort
        .then(() => {
            this.setState({
                sort: {
                    by: sortBy,
                    value: sortValue
                }
            });
        })
        .then(() => {
            this.props.onSort(this.state.sort);
        })
        .catch((msg) => {
            console.log(msg);
        })
        ;
    }

    render() {

        var { sort } = this.state;

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

export default Sort;
