import React from 'react';
import { IntlProvider } from 'react-intl';
import StateHelpers from './helpers/StateHelpers.js';
import ActionHelpers from './helpers/ActionHelpers.js';
import TopMenu from './components/TopMenu.jsx';

class TopMenuComponent extends React.Component {

    render() {

        let stateHelpers = new StateHelpers();
        let actionHelpers = new ActionHelpers(this.props);

        let authInfo = stateHelpers.getAuthInfo(this.props);
        let localizations = stateHelpers.getLocalizations(this.props);
        let urls = stateHelpers.getUrls(this.props);
        let currentPortalKey = stateHelpers.getCurrentPortalKey();

        let visibilitySettings = {
            showAnonymousUserLanguageSelector: this.props.showAnonymousUserLanguageSelector,
            showAnonymousUserBackLink: this.props.showAnonymousUserBackLink,
            showAnonymousUserSignInLink: this.props.showAnonymousUserSignInLink,
            showSignedInUserLanguageSelector: this.props.showSignedInUserLanguageSelector,
            showSignedInUserProfileLinks: this.props.showSignedInUserProfileLinks,
            showSignedInUserOrganizationMenu: this.props.showSignedInUserOrganizationMenu,
            showSignedInUserEnviromentSelector: this.props.showSignedInUserEnviromentSelector,
            showSignedInUserOrganizationInfoLink: this.props.showSignedInUserOrganizationInfoLink
                && this.props.selectedRepresentedOrganizationId,
            showSignedInUserManageUsersLink: this.props.showSignedInUserManageUsersLink
                && this.props.selectedRepresentedOrganizationId,
            showSignedInQatUserLink: this.props.showSignedInQatUserLink,
            allOrganizationsLinkData: this.props.allOrganizationsLinkData,
            hideHomeMenuLink: this.props.hideHomeMenuLink,
            hideRegisterNewOrganizationLink: this.props.hideRegisterNewOrganizationLink,
            hideIfCurrentlyRepresentingOnlyRepresentation: this.props.hideIfCurrentlyRepresentingOnlyRepresentation
        };

        return (
            <IntlProvider {...localizations} >
                <TopMenu
                    visibilitySettings={visibilitySettings}
                    selectedLanguage={localizations.messagesLanguage}
                    authInfo={authInfo}
                    urls={urls}
                    currentPortalKey={currentPortalKey}
                    selectedRepresentationIndex={this.props.selectedRepresentationIndex}
                    allRepresentations={this.props.allRepresentations}
                    representationsOpenedInAdminMode={this.props.representationsOpenedInAdminMode}
                    actionHelpers={actionHelpers}
                    excludedLanguageCodes={this.props.excludedLanguageCodes}
                    onTopMenuItemClicked={this.props.onTopMenuItemClicked}
                />
            </IntlProvider>
            );
    }
}

TopMenuComponent.propTypes = {
    showAnonymousUserLanguageSelector: React.PropTypes.bool,
    showAnonymousUserBackLink: React.PropTypes.bool,
    showAnonymousUserSignInLink: React.PropTypes.bool,
    showSignedInUserLanguageSelector: React.PropTypes.bool,
    showSignedInUserProfileLinks: React.PropTypes.bool,
    showSignedInUserOrganizationMenu: React.PropTypes.bool,
    showSignedInUserEnviromentSelector: React.PropTypes.bool,
    showSignedInUserOrganizationInfoLink: React.PropTypes.bool,
    showSignedInUserManageUsersLink: React.PropTypes.bool,
    showSignedInQatUserLink: React.PropTypes.bool,
    hideHomeMenuLink: React.PropTypes.bool,
    hideIfCurrentlyRepresentingOnlyRepresentation: React.PropTypes.bool,
    hideRegisterNewOrganizationLink: React.PropTypes.bool,
    allOrganizationsLinkData: React.PropTypes.object,

    selectedLanguageCode: React.PropTypes.string.isRequired,
    onLanguageChanged: React.PropTypes.func.isRequired,
    onSignInClicked: React.PropTypes.func.isRequired,
    onSignOutClicked: React.PropTypes.func.isRequired,
    signedInUserFirstName: React.PropTypes.string,
    signedInUserLastName: React.PropTypes.string,
    signedInUserFullName: React.PropTypes.string,
    signedInUserEmail: React.PropTypes.string,
    selectedRepresentationIndex: React.PropTypes.number,
    selectedRepresentedOrganizationId: React.PropTypes.string,
    allRepresentations: React.PropTypes.array,
    representationsOpenedInAdminMode: React.PropTypes.array,
    onSelectedRepresentationChanged: React.PropTypes.func,
    excludedLanguageCodes: React.PropTypes.array,
    onTopMenuItemClicked: React.PropTypes.func,
    selectedRepresentedSyncId: React.PropTypes.string,

    pageLinkRelativeUrls: React.PropTypes.object
};

export default TopMenuComponent;