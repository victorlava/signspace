import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {action, observable, computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import autobind from 'autobind-decorator';

import {NewActivity} from 'components/App/Activities/NewActivity';
import {Activity} from 'models/Activity';
import './styles.scss';


@inject('stores')
@observer
@autobind
export class NewActivityBar extends Component {

    static contextTypes = {stores: PropTypes.object}

    static propTypes = {
        parentActivity: PropTypes.object.isRequired,
    }

    @observable isShown = false;
    @observable width = 'auto';
    @observable newActivity = null;

    constructor(props, context) {
        super(props, context);
        this.initActivity();
    }

    componentDidMount() {
        this.setWidth();
    }

    @action initActivity() {
        this.newActivity = this.createActivity();
    }

    // TODO: Move to activityStore
    createActivity() {
        const activity = new Activity();
        const parent = this.props.parentActivity;
        activity.parent_id = parent.id;
        activity.to = parent.to;
        activity.case_id = parent.case_id;
        return activity;
    }

    @action show() {
        this.isShown = true;
        document.addEventListener('click', this.handleClickPage, false);
        this.setWidth();
    }

    @action hide() {
        this.isShown = false;
        document.removeEventListener('click', this.handleClickPage, false);
    }

    // TODO: should be passed as prop
    @action setWidth() {
        this.width = $('.Activities__Detail').width() + 'px';
    }

    @action handleToChange(value) {
        this.newActivity.to = value.map((val) => val.display_name );
    }

    handleClickPage(e) {
        if ( ! e.target.closest('.new-activity-container')) {
            this.hide();
        }
    }

    handleClickBar(e) {
        e.preventDefault();
        this.show();
    }

    handleClickClose(e) {
        e.preventDefault();
        this.hide();
    }

    handleSubmit() {
        this.props.stores.activityStore.createActivity(this.newActivity)
            .then(() => this.props.stores.activityStore.load())
            .then(() => this.props.stores.documentStore.load())
            .then(() => this.hide())
            .then(() => this.initActivity());
    }

    render() {
        return (
            <div styleName="root" style={{width: this.width}}>
                <Choose>

                    <When condition={this.isShown}>
                        <div className="new-activity-container">
                            <div styleName="close" onClick={this.handleClickClose}>
                                <i className="fa fa-times"></i>
                            </div>
                            <NewActivity
                                activity={this.newActivity}
                                onSubmit={this.handleSubmit}
                                onChange={this.handleToChange}
                            />
                        </div>
                    </When>

                    <Otherwise>
                        <div onClick={this.handleClickBar}>
                            <input
                                styleName="add"
                                type="text"
                                className="form-control"
                                aria-label="Reply"
                                placeholder="Reply"
                            />
                        </div>
                    </Otherwise>

                </Choose>
            </div>
        );
    }

}
