import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {action, observable, computed, reaction} from 'mobx';
import {observer, inject} from 'mobx-react';
import autobind from 'autobind-decorator';
import queryString from 'query-string';
import {animateScroll} from 'react-scroll';

import {NewActivity} from 'components/App/Activities/NewActivity';
import {Activity} from 'models/Activity';
import './styles.scss';


@inject('stores', 'history')
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
        this.initNewActivity();
        this.checkIsShown();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.parentActivity.id !== nextProps.parentActivity.id) {
            this.initNewActivity(nextProps.parentActivity);
        }
        this.checkIsShown();
    }

    componentDidMount() {
        this.setWidth();
    }

    checkIsShown() {
        const {history} = this.props;
        const qs = queryString.parse(window.location.search);
        if ('reply' in qs) {
            this.show();
            this.props.history.replace(window.location.pathname);
        }
    }

    @action initNewActivity(parent) {
        parent = parent || this.props.parentActivity;
        this.newActivity = this.createActivity(parent);
    }

    // TODO: Move to activityStore
    createActivity(parent) {
        const activity = new Activity();
        activity.parent_id = parent.id;
        activity.to = parent.to;
        activity.case_id = parent.case_id;
        return activity;
    }

    @action show() {
        if (this.isShown) {
            return;
        }
        this.isShown = true;
        document.addEventListener('click', this.handleClickPage, false);
        this.setWidth();
        animateScroll.scrollTo(
            $('.Activities__Detail__parent-activity').offset().top - 8,
            {duration: 350}
        );
    }

    @action hide() {
        if ( ! this.isShown) {
            return;
        }
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
            .then(() => this.initNewActivity());
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
                                placeholder="Click here to reply"
                            />
                        </div>
                    </Otherwise>

                </Choose>
            </div>
        );
    }

}
