import React, {Component} from 'react';
import {PropTypes as MobxPropTypes, inject} from 'mobx-react';

import {Item} from './Item';
import './styles.scss';


@inject('stores')
export class Activities extends Component {

    static propTypes = {
        activities: MobxPropTypes.arrayOrObservableArray.isRequired,
    }

    active(activity, activeID) {
        return activity.id == activeID;
    }

    render() {
        const activeID = window.location.pathname.split('/activities/')[1];
        const activeActivity = this.props.stores.activityStore.objects.find((a) => a.id === activeID);
        const activeCaseID = activeActivity ? activeActivity.case_id : null;
        return (
            <div styleName="root">
                <div styleName="group">
                    <a href="#" styleName="title">
                        Today <i className="fa fa-caret-up" /> {/* TODO: fa-caret-down */}
                    </a>
                    <ul styleName="item-list">
                        <For each="activity" of={this.props.activities}>
                            <Item
                                activity={activity}
                                key={activity.id}
                                active={activity.id === activeID}
                                related={activity.case_id === activeCaseID && activity.id !== activeID} />
                        </For>
                    </ul>
                </div>
            </div>
        );
    }

}
