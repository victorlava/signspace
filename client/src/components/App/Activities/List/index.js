import React, {Component} from 'react';
import {PropTypes as MobxPropTypes} from 'mobx-react';

import {Switcher} from './Switcher';
import {Activities} from './Activities';
import {Cases} from './Cases';
import './styles.scss'; 

export class List extends Component {

    static propTypes = {
        activities: MobxPropTypes.arrayOrObservableArray.isRequired,
        //cases: MobxPropTypes.array.isRequired,
    }

    render() {
        return (
            <div styleName="root"> 
                <Switcher />
                <Activities activities={this.props.activities} />
                <Cases /> 
            </div>
        );
    }

}
