import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';

import {Activity} from './Activity';
import {CaseHeader} from './CaseHeader';
import {NewActivityBar} from './NewActivityBar';
import './styles.scss';

@inject('stores')
@observer
export class Detail extends Component {

    static contextTypes = {stores: PropTypes.object};

    @computed get activity() {
        const id = this.props.match.params.id;
        const {objects} = this.props.stores.activityStore;
        return objects.find((obj) => obj.id === id);
    }

    @computed get case() {
        const case_id = this.activity.case_id;
        const {objects} = this.props.stores.caseStore;
        return objects.find((obj) => obj.id === case_id);
    }

    @computed get childActivities() {
        const {objects} = this.props.stores.activityStore;
        return objects.filter((obj) => obj.parent_id === this.activity.id);
    }

    render() {
        return (
            <div styleName="root" className="Activities__Detail">
                <div styleName="inner">
                    <If condition={this.activity && this.case}>
                        <CaseHeader case={this.case} />
                        <Activity activity={this.activity} parent />
                        <For each="childActivity" of={this.childActivities}>
                            <Activity activity={childActivity} />
                        </For>
                    </If>
                </div>
                <If condition={this.activity && this.case}>
                    <NewActivityBar parentActivity={this.activity} />
                </If>
            </div>
        );
    }

}
