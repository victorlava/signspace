/* eslint react/no-multi-comp: 0 */

import React from 'react';
import Select from 'react-select';
import { action, computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import autobind from 'autobind-decorator';
import { API_BASE_URL } from 'constants.jsx';


@inject('uistore')
@observer
@autobind
export default class SendTo extends React.Component {

    static propTypes = {
        parentChange: React.PropTypes.func,
    }

    static defaultProps = {
        state: { value: '' },
        parentChange: () => {},
    }

    // INFO: `react-select` expects value to be in `state`, otherwise it won't work
    @computed get state() {
        return this.props.state;
    }

    @action handleChange(val) {
        this.setState({ value: val });
        this.props.parentChange(val);
    }

    @action getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

        return fetch(API_BASE_URL + '/users/' + input)
            .then((response) => response.json())
            .then((json) => {
                return { options: json.data };
            });
	}

    render () {
        return (
            <Select.AsyncCreatable
                name="to"
                valueKey="id"
                labelKey="display_name"
                value={this.state.value}
                loadOptions={this.getUsers}
                onChange={this.handleChange}
                multi={true}
                backspaceRemoves={true}
            />
        );
    }
}
