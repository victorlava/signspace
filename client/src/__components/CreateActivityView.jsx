/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';
import classNames from 'classnames';

import { api } from 'utils.jsx';
import { PrivacySelector } from 'components/PrivacySelector';
import SendTo from 'components/SendTo';
import { ACTIVITY_TYPES, MESSAGE } from 'constants.jsx';
import { Activity } from 'models/Activity';
import { Case } from 'models/Case';


@inject('uistore')
@observer
@autobind
export class CreateActivityView extends React.Component {

    static contextTypes = { uistore: React.PropTypes.object }

    static propTypes = {
        activity: React.PropTypes.object,
        isShown: React.PropTypes.bool,
        case: React.PropTypes.object,
        showPrivacySelector: React.PropTypes.bool,
        submitButtonText: React.PropTypes.string,
        onPost: React.PropTypes.func,
    }

    static defaultProps = {
        showPrivacySelector: false,
        isShown: true,
        submitButtonText: 'Post',
        activity: new Activity(),
        case: new Case(),
        onPost: () => {},
    }

    constructor(props) {
        super(props);
        window.create_activity_view = this;
        this.is_shown = this.props.isShown;
    }

    @observable is_shown = true;

    @computed get activity() {
        // XXX: this is horrible...
        this.props.activity.case_id = this.props.case.id;
        return this.props.activity;
    }

    @action show() {
        this.is_shown = true;
    }

    @action hide() {
        this.is_shown = false;

    @action handlePost() {
        const activity = this.activity;
        // XXX: creates double activity? one stand-alone and another with CreateCase command?
        api.post('/create-activity', { activity }).end((err, res) => {
            window.activity_stream.load();
        });
        this.props.onPost();
    }

    @action handleClickTab(e, activity_type) {
        e.preventDefault();
        this.activity.type = activity_type;
    }

    @action handleChange(e) {
        const [key, value] = [e.target.name, e.target.value];
        this.activity[key] = value;
    }

    @action onSendToChange(val) {
        this.props.activity.to = val.map(
            function(i) {
                return i.id;
            }
        );
    }

    tabPanelStyle(activity_type) {
        return { display: this.activity.type === activity_type ? 'block' : 'none' };
    }

    renderTab(activity_type) {
        const active = this.activity.type === activity_type;
        const classes = classNames('nav-link', { active });
        return (
            <li className="nav-item" key={activity_type}>
                <a href="#" className={classes} onClick={(e) => this.handleClickTab(e, activity_type) }>
                    { ACTIVITY_TYPES[activity_type] }
                </a>
            </li>
        );
    }

    render() {
        const act = this.activity;
        const display = this.is_shown ? 'block' : 'none';
        return (
            <div className="create-activity-view" style={{display}}>
                <ul className="nav nav-tabs">
                    { Object.keys(ACTIVITY_TYPES).map(this.renderTab) }
                </ul>
                <div className="create-message-activity" style={this.tabPanelStyle(MESSAGE)}>
                    <div style={{padding: '16px 0 4px 0'}}>
                        <SendTo
                            label="To"
                            parentChange={this.onSendToChange}
                        />
                    </div>
                    <div>
                        <textarea
                            name="text"
                            value={act.text}
                            onChange={this.handleChange}
                            placeholder="Your message"
                        />
                    </div>
                    { this.props.showPrivacySelector &&
                        <PrivacySelector
                            value={act.privacy}
                            onChange={this.handleChange}
                        />
                    }
                    <button onClick={this.handlePost}>
                        {this.props.submitButtonText}
                    </button>
                </div>
                <div />
                <div />
            </div>
        );
    }

}
