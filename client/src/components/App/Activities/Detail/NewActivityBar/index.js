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
    @observable newActivity = new Activity();

    constructor(props, context) {
        super(props, context);
        this.newActivity.parent_id = props.parentActivity.id;
        this.newActivity.to = props.parentActivity.to;
        this.newActivity.case_id = props.parentActivity.case_id;
    }

    componentDidMount() {
        this.setWidth();
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
            .then(() => this.hide());
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
                            />
                        </div>
                    </When>

                    <Otherwise>
                        <div onClick={this.handleClickBar}>
                            <input
                                styleName="add"
                                type="text"
                                className="form-control"
                                aria-label="Add a new activity"
                                placeholder="Add a new activity"
                            />
                        </div>
                    </Otherwise>

                </Choose>
            </div>
        );
    }

}
