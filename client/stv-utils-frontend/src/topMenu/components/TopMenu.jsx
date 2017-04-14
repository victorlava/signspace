import React from 'react';
import { intlShape } from 'react-intl';

import messageDefinitions from '../localizations/MessageDefinitions.js';

import HorizontalMenuBar from './layout/HorizontalMenuBar.jsx';
import MenuDropDown from './layout/MenuDropDown.jsx';
import MenuDropDownItem from './layout/MenuDropDownItem.jsx';
import MenuDropDownSelectableItem from './layout/MenuDropDownSelectableItem.jsx';
import MenuDropDownGroupTitle from './layout/MenuDropDownGroupTitle.jsx';
import MenuDropDownSeparator from './layout/MenuDropDownSeparator.jsx';
import MenuItemsGroup from './layout/MenuItemsGroup.jsx';
import MenuLink from './layout/MenuLink.jsx';

class TopMenu extends React.Component {

    doHideLanguageSelection(languageCode) {
        let excludedLanguageCodes = this.props.excludedLanguageCodes;

        return excludedLanguageCodes && excludedLanguageCodes.indexOf(languageCode) > -1
    }

    render() {

        const { formatMessage } = this.context.intl;

        let representationsExist = this.props.allRepresentations && this.props.allRepresentations.length;

        let isLoggedIn = this.props.authInfo.user;

        if (isLoggedIn) {

            let userFirstNameLine = this.props.authInfo.user.firstName;

            let userInfoLine = this.props.authInfo.user.fullName + ' - ' + this.props.authInfo.user.email;

            let currentEnvironmentText = formatMessage(messageDefinitions[this.props.currentPortalKey]);

            let userProfileLinks = this.props.visibilitySettings.showSignedInUserProfileLinks
                ? (
                <div>
                    <MenuDropDownSeparator
                        id="top_menu_user_info_seperator"
                    />
                    <MenuDropDownItem
                        id="top_menu_user_info_details"
                        text={formatMessage(messageDefinitions.userDetails)}
                        url={this.props.urls.sp.userDetails}
                    />
                    <MenuDropDownItem
                        id="top_menu_user_info_change_password"
                        text={formatMessage(messageDefinitions.changePassword)}
                        url={this.props.urls.sp.changePassword}
                    />
                </div>
                )
                : null;

            let languageSelector = this.props.visibilitySettings.showSignedInUserLanguageSelector
                ? (
                <div>
                    <MenuDropDownSeparator
                        id="top_menu_user_change_language_seperator"
                    />
                    <MenuDropDownGroupTitle
                        id="top_menu_user_change_language_header"
                        text={formatMessage(messageDefinitions.changeLanguage)}
                    />
                    <MenuDropDownSelectableItem
                        id="top_menu_user_info_lang_fi"
                        text={formatMessage(messageDefinitions.languages.fi)}
                        isSelected={this.props.selectedLanguage === 'fi'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('fi')}
                        isHidden={this.doHideLanguageSelection('fi')}
                    />
                    <MenuDropDownSelectableItem
                        id="top_menu_user_info_lang_sv"
                        text={formatMessage(messageDefinitions.languages.sv)}
                        isSelected={this.props.selectedLanguage === 'sv'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('sv')}
                        isHidden={this.doHideLanguageSelection('sv')}
                    />
                    <MenuDropDownSelectableItem
                        id="top_menu_user_info_lang_et"
                        text={formatMessage(messageDefinitions.languages.et)}
                        isSelected={this.props.selectedLanguage === 'et'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('et')}
                        isHidden={this.doHideLanguageSelection('et')}
                    />
                    <MenuDropDownSelectableItem
                        id="top_menu_user_info_lang_en"
                        text={formatMessage(messageDefinitions.languages.en)}
                        isSelected={this.props.selectedLanguage === 'en'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('en')}
                        isHidden={this.doHideLanguageSelection('en')}
                    />
                </div>
                )
                : null;

            let enviromentMenu = null;

            if (this.props.visibilitySettings.showSignedInUserEnviromentSelector === true
                || typeof this.props.visibilitySettings.showSignedInUserEnviromentSelector === "undefined") {
                enviromentMenu = (
                    <MenuDropDown
                        id="top_menu_enviroment_dropdown"
                        text={currentEnvironmentText}
                    >
                        {!this.props.visibilitySettings.hideHomeMenuLink
                            ?
                            <MenuDropDownItem
                                id="top_menu_enviroment_home"
                                text={formatMessage(messageDefinitions.sp)}
                                url={this.props.urls.sp.home}
                            />
                            : null
                        }
                        {!this.props.visibilitySettings.hideHomeMenuLink && representationsExist
                            ?
                            <MenuDropDownSeparator
                                id="top_menu_enviroment_taxnumber_seperator"
                            />
                            : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownGroupTitle
                                id="top_menu_enviroment_taxnumber_header"
                                text={formatMessage(messageDefinitions.taxnumber.header)}
                            />
                            : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownItem
                                id="top_menu_enviroment_taxnumber_report"
                                text={formatMessage(messageDefinitions.taxnumber.report)}
                                url={this.props.urls.taxnumber.report}
                            />
                           : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownItem
                                id="top_menu_enviroment_taxnumber_register"
                                text={formatMessage(messageDefinitions.taxnumber.register)}
                                url={this.props.urls.taxnumber.register}
                            />
                           : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownSeparator
                                id="top_menu_enviroment_tilaajavastuu_seperator"
                            />
                           : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownGroupTitle
                                id="top_menu_enviroment_tilaajavastuu_header"
                                text={formatMessage(messageDefinitions.tilaajavastuu.header)}
                            />
                           : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownItem
                                id="top_menu_enviroment_tilaajavastuu_report"
                                text={formatMessage(messageDefinitions.tilaajavastuu.report)}
                                onClick={ () => this.props.onTopMenuItemClicked("Raportti")}
                            />
                           : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownItem
                                id="top_menu_enviroment_tilaajavastuu_supervisor"
                                text={formatMessage(messageDefinitions.tilaajavastuu.supervisor)}
                                onClick={ () => this.props.onTopMenuItemClicked("Valvoja")}
                            />
                           : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownSeparator
                                id="top_menu_enviroment_competency_seperator"
                            />
                           : null
                        }
                        { representationsExist
                            ?
                            <MenuDropDownItem
                                id="top_menu_enviroment_competency_home"
                                text={formatMessage(messageDefinitions.competency)}
                                url={this.props.urls.competency.home}
                            />
                            : null
                        }
                        {this.props.visibilitySettings.showSignedInQatUserLink
                            ?
                            <MenuDropDownSeparator
                                id="top_menu_enviroment_admin_tools_seperator"
                            />
                            : null
                        }
                        {this.props.visibilitySettings.showSignedInQatUserLink
                            ?
                            <MenuDropDownGroupTitle
                                id="top_menu_enviroment_admin_tools_header"
                                text={formatMessage(messageDefinitions.adminTools.header)}
                            />
                            : null
                        }
                        {this.props.visibilitySettings.showSignedInQatUserLink
                            ?
                            <MenuDropDownItem
                                id="top_menu_enviroment_qvarn_access_tools"
                                text={formatMessage(messageDefinitions.adminTools.qvarnAccessTools)}
                                url={this.props.urls.qatAccessTools.home}
                            />
                            : null
                        }
                    </MenuDropDown>
                )
            }


            let organizationMenu = null;
            if (this.props.visibilitySettings.showSignedInUserOrganizationMenu) {

                let signedInUserInfoAndManagementLinks = null;

                if (this.props.visibilitySettings.showSignedInUserOrganizationInfoLink ||
                    this.props.visibilitySettings.showSignedInUserManageUsersLink) {
                    signedInUserInfoAndManagementLinks = (
                        <div>
                            {this.props.visibilitySettings.showSignedInUserOrganizationInfoLink ?
                                (
                                <MenuDropDownItem
                                    id="top_menu_org_info_org_info"
                                    text={formatMessage(messageDefinitions.organizationInfo)}
                                    url={this.props.urls.sp.organizationinfo}
                                    iconClass="fa fa-list-alt icon-brand-color"
                                />
                                ) :
                                null
                            }

                            {this.props.visibilitySettings.showSignedInUserManageUsersLink ?
                                (
                                <MenuDropDownItem
                                    id="top_menu_org_info_users"
                                    text={formatMessage(messageDefinitions.users)}
                                    url={this.props.urls.sp.users}
                                    iconClass="fa fa-user icon-brand-color"
                                />
                                ) :
                                null
                            }

                            <MenuDropDownSeparator
                                id="top_menu_org_info_seperator"
                            />
                        </div>
                    )
                }


                let representations = null;
                let newOrganization = null;
                let showAllOrganizations = null;
                let currentRepresentationText = null;
                let representationsHeader = null;

                currentRepresentationText = this.props.selectedRepresentationIndex !== null
                    ? this.props.allRepresentations[this.props.selectedRepresentationIndex]
                    : formatMessage(messageDefinitions.noCompanySelected);

                if (representationsExist) {

                    let nowRepresentingTheOnlyRepresentation = this.props.allRepresentations.length === 1
                        && this.props.selectedRepresentationIndex !== null;

                    let shouldHideSingleItem = this.props.visibilitySettings.hideIfCurrentlyRepresentingOnlyRepresentation
                        && nowRepresentingTheOnlyRepresentation;

                    if (!shouldHideSingleItem) {

                        representations = this.props.allRepresentations.map((item, index) =>
                            <MenuDropDownSelectableItem
                                id={'top_menu_represented_org_' + index}
                                index={index}
                                key={index}
                                text={item}
                                markedAsAdmin={this.props.representationsOpenedInAdminMode}
                                isSelected={index === this.props.selectedRepresentationIndex}
                                onClick={this.props.actionHelpers.getRepresentationClickHandler(index)}
                            />
                        );
                    }
                }


                representationsHeader = (representations && representations.length
                    ?
                    <MenuDropDownGroupTitle
                        id="top_menu_represented_orgs_header"
                        text={formatMessage(
                            this.props.selectedRepresentationIndex !== null
                                ? messageDefinitions.switchRepresentatedOrg
                                : messageDefinitions.goToRepresentatedOrg
                        )}
                    />
                    : null
                );

                newOrganization = (this.props.visibilitySettings.hideRegisterNewOrganizationLink
                    ? null
                    :
                    <MenuDropDownItem
                        id="top_menu_org_info_new_organization"
                        text={formatMessage(messageDefinitions.registerNewOrganization)}
                        url={this.props.urls.sp.registerNewOrganization}
                        iconClass="fa fa-plus icon-brand-color"
                    />
                );

                var showAllValuesObject = {
                    orgCount: null
                };

                if (this.props.visibilitySettings.allOrganizationsLinkData &&
                    this.props.visibilitySettings.allOrganizationsLinkData.count) {
                    showAllValuesObject.orgCount = "(" + this.props.visibilitySettings.allOrganizationsLinkData.count + ")";
                }

                showAllOrganizations = (this.props.visibilitySettings.allOrganizationsLinkData &&
                    this.props.visibilitySettings.allOrganizationsLinkData.showLink
                    ?
                    <MenuDropDownItem
                        id="top_menu_show_all_organizations"
                        text={formatMessage(
                            this.props.visibilitySettings.allOrganizationsLinkData.isAdmin
                                ? messageDefinitions.showAllOrganizationsAsAdmin
                                : messageDefinitions.showAllOrganizations
                            ,
                            showAllValuesObject
                        )}
                        url={this.props.urls.sp.organizations}
                        iconClass="fa fa-bars icon-brand-color"
                        className={representations ? "mt-3" : ''}
                    />
                    : null
                );

                organizationMenu = (
                    <MenuDropDown
                        id="top_menu_org_dropdown"
                        text={currentRepresentationText}
                        dropdownMenuRight={true}
                    >
                        {signedInUserInfoAndManagementLinks}
                        {representationsHeader}
                        {representations}
                        {showAllOrganizations}
                        {newOrganization && (representations || showAllOrganizations)
                            ? <MenuDropDownSeparator id="top_menu_org_info_new_organization_seperator" />
                            : null
                        }
                        {newOrganization}
                    </MenuDropDown>);
            }

            let changeBgColor = this.props.representationsOpenedInAdminMode && this.props.representationsOpenedInAdminMode.length
                && this.props.representationsOpenedInAdminMode.indexOf(this.props.selectedRepresentationIndex) > -1;

            return (
                <HorizontalMenuBar urls={this.props.urls} currentPortalKey={this.props.currentPortalKey} changeBgColor={changeBgColor}>
                    <MenuItemsGroup id="top_menu_signed_in_left_group" alignLeft={true}>
                        {enviromentMenu}
                    </MenuItemsGroup>
                    <MenuItemsGroup id="top_menu_signed_in_right_group" alignRight={true}>
                        {organizationMenu}
                        <MenuDropDown
                            id="top_menu_user_dropdown"
                            iconClass="fa fa-user"
                            text={userFirstNameLine}
                            dropdownMenuRight={true}
                        >
                            <MenuDropDownGroupTitle
                                id="top_menu_user_info_header"
                                text={userInfoLine}
                            />
                            {languageSelector}
                            {userProfileLinks}
                            <MenuDropDownSeparator
                                id="top_menu_user_info_signout_seperator"
                            />
                            <MenuDropDownItem
                                id="top_menu_user_info_signout"
                                text={formatMessage(messageDefinitions.signOut)}
                                onClick={this.props.actionHelpers.getOnSignOutClickHandler()}
                            />
                        </MenuDropDown>
                    </MenuItemsGroup>
                </HorizontalMenuBar>
            );
        }
        else {

            let selectedLanguageText = formatMessage(messageDefinitions.languages[this.props.selectedLanguage]);

            let languageSelector = this.props.visibilitySettings.showAnonymousUserLanguageSelector
                ? (
                <MenuDropDown id="top_menu_lang_dropdown" text={selectedLanguageText}>
                    <MenuDropDownSelectableItem
                        id="top_menu_lang_fi"
                        text={formatMessage(messageDefinitions.languages.fi)}
                        isSelected={this.props.selectedLanguage === 'fi'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('fi')}
                        isHidden={this.doHideLanguageSelection('fi')}
                    />
                    <MenuDropDownSelectableItem
                        id="top_menu_lang_sv"
                        text={formatMessage(messageDefinitions.languages.sv)}
                        isSelected={this.props.selectedLanguage === 'sv'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('sv')}
                        isHidden={this.doHideLanguageSelection('sv')}
                    />
                    <MenuDropDownSelectableItem
                        id="top_menu_lang_et"
                        text={formatMessage(messageDefinitions.languages.et)}
                        isSelected={this.props.selectedLanguage === 'et'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('et')}
                        isHidden={this.doHideLanguageSelection('et')}
                    />
                    <MenuDropDownSelectableItem
                        id="top_menu_lang_en"
                        text={formatMessage(messageDefinitions.languages.en)}
                        isSelected={this.props.selectedLanguage === 'en'}
                        onClick={this.props.actionHelpers.getLanguagesOnClickHandler('en')}
                        isHidden={this.doHideLanguageSelection('en')}
                    />
                </MenuDropDown>
                )
                : null;

            let backLink = this.props.visibilitySettings.showAnonymousUserBackLink
                ? <MenuLink
                    id="top_menu_back_to_public_link"
                    text={formatMessage(messageDefinitions.backToPublicWebsite)}
                    url={this.props.urls.publicWebsite.home}
                  />
                : null;

            let signInLink = this.props.visibilitySettings.showAnonymousUserSignInLink
                ? <MenuLink
                    id="top_menu_signin_link"
                    text={formatMessage(messageDefinitions.signIn)}
                    onClick={this.props.actionHelpers.getOnSignInClickHandler()}
                  />
                : null;

            return (
                <HorizontalMenuBar urls={this.props.urls} currentPortalKey={this.props.currentPortalKey} changeBgColor={false}>
                    <MenuItemsGroup id="top_menu_signed_out_left_group" alignLeft={true}>
                        {languageSelector}
                    </MenuItemsGroup>
                    <MenuItemsGroup id="top_menu_signed_out_right_group" alignRight={true}>
                        {signInLink}
                        {backLink}
                    </MenuItemsGroup>
                </HorizontalMenuBar>
            );
        }
    }
}

TopMenu.contextTypes = {
    intl: intlShape.isRequired
};

export default TopMenu;
