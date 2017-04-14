import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import './styles.scss';


export class Item extends Component {

    static propTypes = {
        activity: PropTypes.object.isRequired,
    }

    render() {
        const {activity} = this.props;
        return (
            <li styleName="root" className="parent">
                <Link to={`/activities/${activity.id}`}>
                    <div className="row">
                        <div className="col-1">
                            <div className="icon icon-circle icon-circle-late">
                                <i className="fa fa-edit"></i>
                            </div>
                        </div>
                        <div className="col-10">
                            <h3 styleName="username">{activity.sent_from}</h3>
                            <p>{activity.text}</p>
                            <p styleName="time-and-task">
                                <time dateTime={activity.created}>{activity.created.slice(0, 10)} </time>
                                | {activity.case_title}
                            </p>
                        </div>
                    </div>
                </Link>
            </li>
        );
    }

}
