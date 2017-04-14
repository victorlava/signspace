import React, {Component} from 'react';
import './styles.scss';


export class SearchBar extends Component {

    render() {
        return (
            <div styleName="root">
                <div className="input-group input-group-long input-group-lg"> 
                    <div className="input-group-btn">
                        <button
                            type="button"
                            className="btn btn-secondary dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            Filters
                        </button>
                        <div className="dropdown-menu">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        aria-label={this.props.placeholder}
                        placeholder={this.props.placeholder}
                    />
                </div>
            </div>
        );
    }

}
