import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';
import {Link} from 'react-router-dom';
import './styles.scss'; 


export class ChildLink extends Component {

    static propTypes = {
        childActivities: MobxPropTypes.arrayOrObservableArray.isRequired,
    }

    render() {
        return (
            <div styleName="root">
                <ul>
                    <For each="child" of={this.props.childActivities}>
                        <li className="box box-sm box-half" key={child.id}> 
                            <Link to={child.parent_id}>
                                { /* TODO: this is for activity type. Task or something. Style works fine.
                                <div className="icon icon-circle icon-circle-late">
                                    <i className="fa fa-check-square-o"></i> 
                                </div>
                                */}
                                <p className="ellipsis">
                                    <span>
                                        <i className="fa fa-user-circle-o"></i> {child.sent_from}
                                    </span>
                                    <span className="description">
                                        {child.text.slice(0, 40)} 
                                    </span>
                                </p>
                                <i className="fa fa-angle-right float-right"></i> 
                            </Link>
                        </li>
                    </For>
                </ul>
            </div> 
        );
    }

}
