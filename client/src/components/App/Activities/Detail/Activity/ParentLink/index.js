import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import "./styles.scss"; 

export class ParentLink extends Component {

    static propTypes = {
        parentActivity: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div styleName="root" className="box box-sm box-half">
                {/* TODO: double check if really gets parent activity. */} 
                <Link to={this.props.parentActivity.id}>
                    <p className="ellipsis"> 
                        <i className="fa fa-angle-left"></i>
                        <span>
                            <i className="fa fa-user-circle-o"></i> {this.props.parentActivity.sent_from} 
                        </span>
                        <span className="description">
                            {this.props.parentActivity.text.slice(0, 40)}...
                        </span>
                    </p>
                </Link>
            </div>
        );
    }

}
