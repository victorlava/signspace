import React, {Component} from 'react';
import {PropTypes as MobxPropTypes} from 'mobx-react';

import {Item} from './Item';
import './styles.scss';


export class Activities extends Component {

    static propTypes = {
        activities: MobxPropTypes.arrayOrObservableArray.isRequired,
    }

    render() {
        return (
            <div styleName="root">
                <div styleName="group">
                    <a href="#" styleName="title">
                        Today <i className="fa fa-caret-up" /> {/* TODO: fa-caret-down */}
                    </a>
                    <ul styleName="item-list">
                        <For each="activity" of={this.props.activities}>
                            <Item activity={activity} key={activity.id} />
                        </For>
                    </ul>
                </div>
            </div>
        );
    }

}
