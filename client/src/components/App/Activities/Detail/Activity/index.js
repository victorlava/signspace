import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import autobind from 'autobind-decorator';
import {Link} from 'react-router-dom';

import {ParentLink} from './ParentLink';
import {ChildLink} from './ChildLink';
import {Message} from './Message';
import './styles.scss';


@inject('stores')
@observer 
@autobind
export class Activity extends Component {

    static contextTypes = {stores: PropTypes.object}

    static propTypes = {
        activity: PropTypes.object.isRequired,
        parent: PropTypes.bool,
    }

    static defaultProps = {
        parent: false,
    }

    @computed get parentActivity() {
        const {objects} = this.props.stores.activityStore;
        return objects.find((obj) => obj.id === this.props.activity.parent_id);
    }

    @computed get childActivities() {
        const {objects} = this.props.stores.activityStore;
        return objects.filter((obj) => obj.parent_id === this.props.activity.id);
    }


    render() {
        return (
            <div>
                <If condition={this.props.parent && this.parentActivity}>
                    <ParentLink parentActivity={this.parentActivity} />
                </If>
                {/* TODO: If parent then add class "box-parent" to .box */}
                <div styleName="root" className="box box-parent">
                    <Message activity={this.props.activity} />
                    <div styleName="star">
                        <Link className="icon" to="#">
                            <i className="fa fa-star" />
                        </Link>
                    </div>
                    <div styleName="tools">
                        <ul>
                            <li>
                                <Link className="icon" to="#">
                                    <i className="fa fa-reply" />
                                </Link>
                            </li>
                            <li>
                                <Link className="icon" to="#">
                                    <i className="fa fa-caret-down" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <If condition={ ! this.props.parent && this.childActivities}>
                    <ChildLink childActivities={this.childActivities} />
                </If>
            </div>
        );
    }

}
