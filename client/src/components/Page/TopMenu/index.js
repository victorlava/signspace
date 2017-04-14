import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';

import './styles.scss';


@autobind
export class TopMenu extends Component {

    static propTypes = {
        activeLinkUrl: PropTypes.string,
    }

    active(url) {
        return this.props.activeLinkUrl === url ? 'active' : '';
    }

    render() {
        return (
            <div styleName="root">
                <nav className="navbar navbar-toggleable-md"> 
                    <div className="collapse navbar-collapse">

                        {/* Left navbar */}
                        <ul className="navbar-nav mr-auto">

                            {/* Space selector */}
                            <li className="nav-item dropdown dropdown--select">
                                <a className="nav-link dropdown-toggle" href="#" id="space-selector"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-folder-open"></i>
                                    Espoo Business Park
                                </a>
                                <div className="dropdown-menu" aria-labelledby="space-selector">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                </div>
                            </li>

                            {/* Links */}
                            <li className={`nav-item nav-item-home nav-item-icon ${this.active('/')}`}>
                                <Link to="/" className="nav-link">
                                    <i className="fa fa-home"></i>
                                </Link>
                            </li>
                            <li className={`nav-item ${this.active('/activities')}`}>
                                <Link to="/activities" className="nav-link">Activities</Link>
                            </li>  
                            <li className={`nav-item ${this.active('/documents')}`}>
                                <Link to="/documents" className="nav-link">Documents</Link>
                            </li> 
                            <li className={`nav-item ${this.active('/tasks')}`}>
                                <Link to="/tasks" className="nav-link">Tasks</Link>
                            </li> 
                        </ul> 

                        {/* Right navbar */}
                        <ul className="navbar-nav">
                            <li className="nav-item nav-item-icon">  
                                <a className="nav-link" href="#">
                                    <i className="fa fa fa-question-circle"></i>
                                </a>
                            </li> 
                        </ul>

                    </div>
                </nav>
            </div>
        );
    }

}
