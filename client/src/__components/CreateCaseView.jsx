/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';

import { api } from 'utils.jsx';
import { CreateActivityView } from 'components/CreateActivityView';
import { PrivacySelector } from 'components/PrivacySelector';
import { Case } from 'models/Case';
import { Activity } from 'models/Activity';


@inject('uistore')
@observer
@autobind
export default class CreateCaseView extends React.Component {

    constructor(props) {
        super(props);
        this.form.case = new Case();
        this.form.first_activity = new Activity();
        this.form.first_activity.case_id = this.form.case.id;
    }

    @observable form = {
        'case': null,
        'first_activity': null,
    }

    @action handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.form.case[e.target.name] = value;
    }

    @action handlePost() {
        api.post('/create-case', this.form).end((err, res) => {
            this.props.uistore.closeModal();
            window.activity_stream.load();
        });
    }

    render() {
        return (
            <div className="create-case-view">
                <div>Create new case</div>
                <small style={{display: 'block'}}>Give a descriptive title for the case.</small>
                <PrivacySelector
                    value={this.form.case.privacy}
                    onChange={this.handleChange}
                />
                <input
                    name="title"
                    value={this.form.case.title}
                    onChange={this.handleChange}
                    placeholder="Case title"
                />
                <div style={{padding: '5px 0'}}>
                    <div>(spaces)</div>
                    <div>(labels)</div>
                </div>
                <CreateActivityView
                    case={this.form.case}
                    activity={this.form.first_activity}
                    showPrivacySelector={false}
                    submitButtonText="Create and Post"
                    onPost={this.handlePost}
                />
            </div>
        );
    }
}
