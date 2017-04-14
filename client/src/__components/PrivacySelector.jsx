import React from 'react';

import { PRIVACY_CHOICES } from 'constants.jsx';


export const PrivacySelector = (props) => (
    <select name="privacy" {...props}>
        {
            Object.keys(PRIVACY_CHOICES).map((choice) =>
                <option value={choice} key={choice}>{ PRIVACY_CHOICES[choice] }</option>)
        }
    </select>
);
