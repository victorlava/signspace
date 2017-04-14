/* eslint react/no-multi-comp: 0 */

import React from 'react';
import {action, observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import autobind from 'autobind-decorator';

import stripDiacritics from './Select/utils/stripDiacritics';
import Select from './Select/Select';

import lucas from 'images/lucas.png';


@inject('stores')
@observer
@autobind
export class PostTo extends React.Component {

    static propTypes = {
        value: React.PropTypes.any,      // array of User objects or singe User object
        onChange: React.PropTypes.func,  // callback to fire on value change
    }

    static defaultProps = {
        value: '',
        onChange: (userModels) => {},
    }

    constructor (args) {
        super(args);
        var value = this.props.value;

        // in case empty array is passed as value re-set value to empty string
        // or if array of users' display names is passed , create Option objects
        if (value.length === 0) {
            value = '';
        } else if (value.length >= 1) {
            value = value.map((val) => {
                return {'display_name': val};
            });
        }
        this.state = { value: value };
    }

    @action handleChange(val) {
        this.setState({ value: val });
        this.props.onChange(val);
    }

    @action getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

        return this.props.stores.userStore.searchUsers(input);
	}

    optionRenderer (option) {
        const image = option['image_url'] || 'image';
        const name = option['display_name'] || 'name';
        const email = option['email'] || 'email';
        const company = option['company_name'] || 'company';

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3 Option-user-icon">
                        <img src={ lucas } />
                    </div>
                    <div className="col-9 Option-user-attributes">
                        <span className="display_name">{ name }</span> <br />
                        <span className="email">{ email }</span> <br />
                        <span className="company_name">{ company }</span>
                    </div>
                </div>
            </div>
        );
    }


    // filter options not only by labelKey, but with extra attributes as well
    filterOption (option, filterString) {
        const name = option['display_name'] || '';
        const email = option['email'] || '';
        const company = option['company_name'] || '';

        var valueTest = String(name + ' ' + email + ' ' + company);
        valueTest = stripDiacritics(valueTest);
        valueTest = valueTest.toLowerCase();
        return valueTest.indexOf(filterString) >= 0;
    }

    clearRenderer () {
        return (
            <span className="Select-clear">
                <i className="fa fa-times-circle" /> Clear all
            </span>
        );
    }

    render () {
        return (
            <Select.AsyncCreatable
                backspaceRemoves={true}
                clearRenderer={this.clearRenderer}
                filterOption={this.filterOption}
                labelKey="display_name"
                loadOptions={this.getUsers}
                multi={true}
                name="to"
                onChange={this.handleChange}
                optionRenderer={this.optionRenderer}
                placeholder=""
                searchPromptText=""
                value={this.state.value}
                valueKey="id"
            />
        );
    }
}
