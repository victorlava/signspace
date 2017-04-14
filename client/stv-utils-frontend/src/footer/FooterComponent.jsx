import React from 'react';
import Footer from './components/Footer.jsx';
import { IntlProvider } from 'react-intl';

import messagesFi from './localizations/fi.json';
import messagesEn from './localizations/en.json';
import messagesSv from './localizations/sv.json';
import messagesEt from './localizations/et.json';

class FooterComponent extends React.Component {

    getLocalizations() {

        let localizations = {
            locale: 'en',
            messagesForAllLanguages: {
                'en': messagesEn,
                'fi': messagesFi,
                'et': messagesEt,
                'sv': messagesSv
            }
        };

        let currentLanguage = this.props.selectedLanguageCode;

        localizations.messages = localizations.messagesForAllLanguages[currentLanguage];
        localizations.messagesLanguage = currentLanguage;

        return localizations;
    }

    render() {
        let localizations = this.getLocalizations();
        return (
            <IntlProvider {...localizations}>
                <Footer
                    selectedLanguage={localizations.messagesLanguage}
                    pushToBottom={this.props.pushToBottom}
                />
            </IntlProvider>
        );
    }
}

FooterComponent.propTypes = {
    selectedLanguageCode: React.PropTypes.string.isRequired,
    pushToBottom: React.PropTypes.bool
};

export default FooterComponent;