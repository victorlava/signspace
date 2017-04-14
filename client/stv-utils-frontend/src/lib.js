import TopMenuComponent from './topMenu/TopMenuComponent.jsx';
import FooterComponent from './footer/FooterComponent.jsx';
import PhoneNumberInputComponent from './phoneNumberInput/PhoneNumberInputComponent.jsx';
import Constants from './topMenu/Constants.js';
import StateHelper from './topMenu/helpers/StateHelpers.js';
import TypeaheadInputComponent from './typeaheadInput/TypeaheadInputComponent.jsx';

if (process.env.NODE_ENV === 'production') {
    require('./commonCss/common.scss');
}

module.exports = {
    TopMenuComponent: TopMenuComponent,
    FooterComponent: FooterComponent,
    PhoneNumberInputComponent: PhoneNumberInputComponent,
    Constants: Constants,
    TypeaheadInputComponent: TypeaheadInputComponent,
    UrlsTreeGetter: (props) => {
        let stateHelpers = new StateHelper();
        return stateHelpers.getUrls(props);
    }
};
