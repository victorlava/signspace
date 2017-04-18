import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {action, observable} from 'mobx';
import {observer, PropTypes as MobxPropTypes} from 'mobx-react';
import autobind from 'autobind-decorator';

import {Activity} from 'models/Activity';
import {Message} from './Message';
import {Signing} from './Signing';
import {Task} from './Task';
import {MESSAGE, SIGNING, TASK} from 'constants.js';
import './styles.scss';


@observer
@autobind
export class NewActivity extends Component {

    static propTypes = {
        activity: MobxPropTypes.observableObject.isRequired,
        showPrivacySelector: PropTypes.bool,
        submitButtonText: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
    }

    static defaultProps = {
        activity: observable(new Activity()),
        showPrivacySelector: false,
        submitButtonText: 'Post',
        onChange: () => {},
        onSubmit: () => {},
    }

    active(activity_type) {
        return this.props.activity.type === activity_type ? 'active' : '';
    }

    @action handleTabChange(activity_type, e) {
        e.preventDefault();
        this.props.activity.type = activity_type;
    }

    render() {
        return (
            <div styleName="root">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a href="#" className={`nav-link ${this.active(MESSAGE)}`}
                            onClick={this.handleTabChange.bind(null, MESSAGE)}>
                            <i className="fa fa-comments-o"></i>
                            Message
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={`nav-link ${this.active(SIGNING)}`}
                            onClick={this.handleTabChange.bind(null, SIGNING)}>
                            <i className="fa fa-edit"></i>
                            Signing
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={`nav-link ${this.active(TASK)}`}
                            onClick={this.handleTabChange.bind(null, TASK)}>
                            <i className="fa fa-check-square-o"></i>
                            Task
                        </a>
                    </li>
                </ul>
                <Choose>
                    <When condition={this.props.activity.type == MESSAGE}>
                        <Message {...this.props} />
                    </When>
                    <When condition={this.props.activity.type == SIGNING}>
                        <Signing {...this.props} />
                    </When>
                    <When condition={this.props.activity.type == TASK}>
                        <Task {...this.props} />
                    </When>
                </Choose>
            </div>
        );
    }

}
