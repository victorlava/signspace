/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { observable, action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import { api } from 'utils.jsx';

const CASE_LIST_VIEW = 1;
const ACTIVITY_LIST_VIEW = 2;

const VIEW_TYPES = {
    [CASE_LIST_VIEW]: 'Case list',
    [ACTIVITY_LIST_VIEW]: 'Activity list',
};


@observer
class ActivityListItem extends React.Component {

    static propTypes = {
        activity: React.PropTypes.object,
    }

    @computed get activity() {
        return this.props.activity;
    }

    render () {
        return (
            <div className="activity-list-item" style={{borderBottom: '1px solid #aaa'}} onClick={(e) => window.case_view.load(this.activity.case_id, this.activity.id)}>
                <div className="activity-sender">
                    {this.activity.sent_from}
                </div>
                <div className="activity-short-text">
                    {this.activity.text}
                </div>
                <div className="activity-list-item-footer">
                    {this.activity.created}
                </div>
            </div>
        );
    }
}


@inject('uistore')
@observer
@autobind
class Switcher extends React.Component {

    static contextTypes = { uistore: React.PropTypes.object };

    @observable view_type = ACTIVITY_LIST_VIEW;

    @computed get view_type_display () {
        return <strong>{ VIEW_TYPES[this.view_type] }</strong>;
    }

    @action handleClick () {
        this.view_type = this.view_type === CASE_LIST_VIEW
            ? ACTIVITY_LIST_VIEW
            : CASE_LIST_VIEW;
    }

    render () {
        return (
            <div style={{paddingTop: '16px'}}>
                <button onClick={ this.handleClick }>{ this.view_type_display }</button>
            </div>
        );
    }
}


@observer
@autobind
export default class ActivityStream extends React.Component {

    constructor(props) {
        super(props);
        // XXX: super tmp hack..
        window.activity_stream = this;
        this.load();
    }

    @observable activities = [];

    @action load() {
        api.get('/activities').end(action((err, res) => {
            console.log(err, res);
            this.activities = res.body.data;
        }));
    }

    render () {
        return (
            <div className="activity-stream">
                <Switcher />
                <div>
                    {this.activities.map((act) =>
                        <ActivityListItem key={act.id} activity={act} />
                    )}
                </div>
            </div>
        );
    }
}
