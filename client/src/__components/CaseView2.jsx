/* eslint react/no-multi-comp: 0 */

import React from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { api } from 'utils.jsx';
import { CreateActivityView } from './CreateActivityView';
import { CreateActivityMinView } from './CreateActivityMinView';
import { MESSAGE, PUBLIC } from 'constants.jsx';

import lucas from 'images/lucas.png';


@observer
class ActivityView extends React.Component {

    @computed get activity() {
        return this.props.activity;
    }

    render () {
        return (
            <div className="activity-view">
                <div className="row">
                    <div className="activity-sender-avatar col-1">
                        <a href="#"><img src={lucas} /></a>
                    </div>
                    <div className="col">
                        <div className="activity-header">
                            <a href="#">{this.activity.sent_from}</a> → <a href="#">1 person</a>
                            <span className="activity-created">{this.activity.created}</span>
                            <span className="activity-privacy">{this.activity.privacy}</span>
                        </div>
                        <div className="activity-text">
                            {this.activity.text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


@observer
@autobind
export default class CaseView extends React.Component {

    constructor(props) {
        super(props);
        window.case_view = this;
    }

    @observable case_ = null;
    @observable parent_activity = null;
    @observable child_activities = [];

    @action load(case_id) {
        api.get('/case-view', {case_id}).end(action((err, res) => {
            const d = res.body.data;
            this.case_ = d.case;
            this.parent_activity = d.parent_activity;
            this.child_activities = [this.parent_activity];
        }));
    }

    render () {
        if ( ! this.case_) {
            return (<div />);
        }
        return (
            <div className="case-view" style={this.props.style}>
                <h1>{this.case_.title}</h1>

                <div>spaces</div>
                <div>labels</div>

                {this.child_activities.map((act) =>
                    <ActivityView key={act.id} activity={act} />
                )}

                <CreateActivityMinView />
                <CreateActivityView
                    case={this.case_}
                    submitButtonText="Post"
                    showPrivacySelector={true}
                />
            </div>
        );
    }
}
