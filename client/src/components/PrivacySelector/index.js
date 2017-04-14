import React, {Component} from 'react';

import { PRIVACY_CHOICES } from 'constants.js';


export class PrivacySelector extends Component {

    render() {
        return (
            <select name="privacy" {...this.props}>
                <For each="choice" of={Object.keys(PRIVACY_CHOICES)}>
                    <option value={choice} key={choice}>{PRIVACY_CHOICES[choice]}</option>
                </For>
            </select>
        );
    }

}
