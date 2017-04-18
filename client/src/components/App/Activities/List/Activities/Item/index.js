import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';


export class Item extends Component {

    static propTypes = {
        active: PropTypes.bool,
        activity: PropTypes.object.isRequired,
        related: PropTypes.bool,
    }

    static defaultProps = {
        active: false,
        related: false,
    }

    render() {
        const {activity} = this.props;
        const innerClasses = classNames({
            active: this.props.active,
            related: this.props.related,
        });
        return (
            <li styleName="root">
                <div styleName="inner" className={innerClasses}>
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
                </div>
            </li>
        );
    }

}
