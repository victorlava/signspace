import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {action, observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import autobind from 'autobind-decorator';

import {PrivacySelector} from 'components/PrivacySelector';
import {NewActivity} from '../NewActivity';
import {Case} from 'models/Case';
import {Activity} from 'models/Activity';
import './styles.scss';

@inject('stores')
@observer
@autobind
export class NewCase extends Component {

    static propTypes = {
        onCaseCreated: PropTypes.func,
        onModalClose: PropTypes.func,
    }

    static defaultProps = {
        onCaseCreated: (res) => {},
        onModalClose: (e) => {},
    }

    constructor(...args) {
        super(...args);
        this.init_form();
    }

    @observable form = {
        'case': null,
        'first_activity': null,
    }

    init_form() {
        this.form.case = new Case();
        this.form.first_activity = new Activity();
        this.form.first_activity.case_id = this.form.case.id;
    }

    @action handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.form.case[e.target.name] = value;
    }

    @action handleToChange(value) {
        this.form.first_activity.to = value.map((val) => val.display_name );
    }

    @action handleSubmit() {
        this.props.stores.caseStore.createCase(this.form).then((res) => {
            this.props.onCaseCreated(res);
        });
    }

    @action handleClickClose(e) {
        e.preventDefault();
    }

    /* TODO: put this into a component, because we are reusing this in caseHeader? */

    handleRemoveSpace(e) {
        e.preventDefault();
        e.currentTarget.remove();
        {/* TODO: remove space from data model */}
    }

    handleRemoveLabel(e) {
        e.preventDefault();
        e.currentTarget.remove();
        {/* TODO: remove label from data model */}
    }

    handleAddSpace(e) {
        e.preventDefault();
        {/* TODO: add space to data model */}
    }

    handleAddLabel(e) {
        e.preventDefault();
        {/* TODO: add label to data model */}
    }

    render() {
        return (
            <div styleName="root">
                <h4 styleName="title">Create new case</h4>
                <p styleName="description"><small>Give a descriptive title for the case.</small></p>

                <form>
                    <div styleName="case">
                        <div className="input-group input-group-long input-group-lg">
                            <div className="input-group-btn">
                                <button
                                    type="button"
                                    className="btn btn-secondary dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <i className="fa fa-unlock"></i>
                                    public
                                </button>
                                <PrivacySelector
                                    className="hidden"
                                    name="privacy"
                                    value={this.form.case.privacy}
                                    onChange={this.handleChange}
                                />
                                <div className="dropdown-menu">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                aria-label="Case title"
                                name="title"
                                value={this.form.case.title}
                                onChange={this.handleChange}
                                placeholder="Case title"
                                tabIndex="1"
                            />
                        </div>
                    </div>

                    <div styleName="labels">
                        <ul className="list list-inline list-label">
                            {/* TODO: loop <For each="child" of={this.props.spaces}> ? */}
                            <li onClick={this.handleRemoveSpace}>
                                <button className="btn btn-info btn-round btn-xs">
                                    <i className="fa fa-folder-open"></i>
                                    <span>Espoo business park</span>
                                    <i className="fa fa-times"></i>
                                </button>
                            </li>
                            { /* </For> */ }
                            <li onClick={this.handleSpace}>
                                <button className="btn btn-outline-info btn-round btn-xs">
                                    <i className="fa">+</i>
                                    <i className="fa fa-folder-open"></i>
                                    <span>Add space</span>
                                </button>
                            </li>
                        </ul>
                        <ul className="list list-inline list-label">
                            {/* TODO: loop <For each="child" of={this.props.labels}> ? */}
                            <li onClick={this.handleRemoveLabel}>
                                <button className="btn btn-secondary btn-round btn-xs">
                                    <span>ebp</span>
                                    <i className="fa fa-times"></i>
                                </button>
                            </li>
                            { /* </For> */ }
                            <li onClick={this.handleAddLabel}>
                                <button className="btn btn-outline-secondary btn-round btn-xs">
                                    <i className="fa">+</i> Add label  {/* No need to loop for "add label" button */}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <NewActivity
                        activity={this.form.first_activity}
                        showPrivacySelector={false}
                        submitButtonText="Create and Post"
                        onSubmit={this.handleSubmit}
                        onChange={this.handleToChange}
                    />
                </form>
                <a href="#" styleName="close" className="icon" onClick={this.props.onModalClose}>
                    <i className="fa fa-times"></i>
                </a>
            </div>
        );
    }

}
