/* eslint react/no-multi-comp: 0 */

import React from 'react';
import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';

import { api } from 'utils.jsx';
import { CreateActivityView } from './CreateActivityView';
import { CreateActivityMinView } from './CreateActivityMinView';

import lucas from 'images/lucas.png';


@observer
@autobind
class ActivityView extends React.Component {

    @computed get activity() {
        return this.props.activity;
    }

    @computed get child_activities() {
        return this.props.child_activities;
    }

    handleRepliesClick(e) {
        e.preventDefault();
        window.case_view.load(this.activity.case_id, this.activity.id);
    }

    renderChildActivities() {
        if ( ! this.child_activities) {
            return;
        }
        const num = this.child_activities.length;
        return (
            <div style={{textAlign: 'right'}}>
                <a href="#" onClick={this.handleRepliesClick}>{num} replies</a>
            </div>
        );
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
                            <a href="#">{this.activity.sent_from}</a> → <a href="#">1 person</a>&nbsp;
                            <span className="activity-created">{this.activity.created.slice(0, 16).replace('T', ' ')}</span>&nbsp;
                            <span className="activity-privacy">({this.activity.privacy})</span>
                        </div>
                        <div className="activity-text">
                            {this.activity.text}
                        </div>
                    </div>
                    { this.renderChildActivities() }
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
    @observable context_activity = null;
    @observable parent_activity = null;
    @observable child_activities = [];
    @observable activities_by_parent = {};

    @action load(case_id, parent_activity_id=null) {
        let payload = {};
        if (parent_activity_id) {
            payload = {case_id: case_id, parent_activity_id: parent_activity_id};
        } else {
            payload = {case_id: case_id};
        }
        api.get('/case-view', payload).end(action((err, res) => {
            const d = res.body.data;
            console.log(d);
            this.case_ = d.case;
            this.context_activity = d.context_activity;
            this.parent_activity = d.parent_activity;

            let child_activities = [this.parent_activity];

            const children = d.activities_by_parent[this.parent_activity.id];

            if (children) {
                child_activities = child_activities.concat(children);
            }

            this.child_activities = child_activities;
        }));
    }

    handleContextClick(e) {
        e.preventDefault();
        this.load(this.case_.id, this.context_activity.id);
    }

    renderHigherContextActivity() {
        if ( ! this.context_activity) {
            return;
        }
        return (
            <div style={{paddingBottom: '16px'}}>
                <a href="#" onClick={this.handleContextClick}>higher context activity</a>
            </div>
        );
    }

    render() {
        if ( ! this.case_) {
            return (<div />);
        }
        return (
            <div className="case-view" style={this.props.style}>
                <h1>{this.case_.title}</h1>

                <div>spaces</div>
                <div>labels</div>

                <br />

                { this.renderHigherContextActivity() }

                {this.child_activities.map((act) =>
                    <ActivityView key={act.id} activity={act} child_activities={this.activities_by_parent[act.id]} />
                )}

                <br />
                <br />
                <br />
                <br />

                <CreateActivityMinView />
                <CreateActivityView
                    submitButtonText="Post"
                    showPrivacySelector={true}
                    isShown={false}
                />
            </div>
        );
    }
}
