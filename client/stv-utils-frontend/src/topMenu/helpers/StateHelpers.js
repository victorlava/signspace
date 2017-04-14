import constants from '../Constants.js';

import messagesFi from '../localizations/fi.json';
import messagesEn from '../localizations/en.json';
import messagesSv from '../localizations/sv.json';
import messagesEt from '../localizations/et.json';

class StateHelpers {

    getAuthInfo(topMenuProps) {
        return {
            urls: {
                signIn: topMenuProps.signInUrl,
                signOut: topMenuProps.signOutUrl
            },
            user: topMenuProps.signedInUserEmail
                ? {
                    firstName: topMenuProps.signedInUserFirstName,
                    lastName: topMenuProps.signedInUserLastName,
                    fullName: topMenuProps.signedInUserFullName,
                    email: topMenuProps.signedInUserEmail
                }
                : null
        };
    }

    getLocalizations(topMenuProps) {

        let localizations = {
            locale: 'en',
            messagesForAllLanguages: {
                'en': messagesEn,
                'fi': messagesFi,
                'et': messagesEt,
                'sv': messagesSv
            }
        };

        let currentLanguage = topMenuProps.selectedLanguageCode;

        localizations.messages = localizations.messagesForAllLanguages[currentLanguage];
        localizations.messagesLanguage = currentLanguage;

        return localizations;
    }

    getCurrentPortalKey() {
        let environment = this.getCurrentEnvironmentCached();
        return environment.portalKey;
    }

    getUrls(topMenuProps) {

        let pageLinkRelativeUrls = topMenuProps && topMenuProps.pageLinkRelativeUrls
            ? Object.assign({}, constants.pageLinkRelativeUrls, topMenuProps.pageLinkRelativeUrls)
            : constants.pageLinkRelativeUrls;

        let pageLinkRelativeUrlsReplaced = {};

        for (let environmentKey of Object.keys(pageLinkRelativeUrls)) {
            let environment = pageLinkRelativeUrls[environmentKey];

            pageLinkRelativeUrlsReplaced[environmentKey] = {};

            for (let key of Object.keys(environment)) {
                let url = environment[key];

                if (topMenuProps.selectedRepresentedOrganizationId) {
                    url = url.replace(constants.pageLinkRelativeUrlOrgIdPlaceholder, topMenuProps.selectedRepresentedOrganizationId);
                }

                if (topMenuProps.selectedRepresentedSyncId) {
                    url = url.replace(constants.pageLinkRelativeUrlSyncIdPlaceholder,  topMenuProps.selectedRepresentedSyncId);
                }

                pageLinkRelativeUrlsReplaced[environmentKey][key] = url;

            }
        }
        pageLinkRelativeUrls = pageLinkRelativeUrlsReplaced;

        let environment = this.getCurrentEnvironmentCached();
        let domainNames = constants.domainNamesForEnvironments[environment.key];

        let spHome = topMenuProps.selectedRepresentedOrganizationId
            ? pageLinkRelativeUrls.sp.organizationHome
            : pageLinkRelativeUrls.sp.home

        // Currently localhost env & valutit alpha are still without SSL:
        let spLinksWithoutSSL = environment.key === "dev";

        let urls = {
            sp: {
                home: this.joinUrl(domainNames.sp, spHome, spLinksWithoutSSL),
                organizationinfo: this.joinUrl(domainNames.sp, pageLinkRelativeUrls.sp.organizationinfo, spLinksWithoutSSL),
                users: this.joinUrl(domainNames.sp, pageLinkRelativeUrls.sp.users, spLinksWithoutSSL),
                userDetails: this.joinUrl(domainNames.sp, pageLinkRelativeUrls.sp.userDetails, spLinksWithoutSSL),
                changePassword: this.joinUrl(domainNames.sp, pageLinkRelativeUrls.sp.changePassword, spLinksWithoutSSL),
                registerNewOrganization: this.joinUrl(domainNames.sp, pageLinkRelativeUrls.sp.registerNewOrganization, spLinksWithoutSSL),
                organizations: this.joinUrl(domainNames.sp, pageLinkRelativeUrls.sp.organizations, spLinksWithoutSSL),
            },
            taxnumber: {
                report: this.joinUrl(domainNames.taxnumber, pageLinkRelativeUrls.taxnumber.report),
                register: this.joinUrl(domainNames.taxnumber, pageLinkRelativeUrls.taxnumber.register),
            },
            tilaajavastuu: {
                report: this.joinUrl(domainNames.tilaajavastuu, pageLinkRelativeUrls.tilaajavastuu.report),
                supervisor: this.joinUrl(domainNames.tilaajavastuu, pageLinkRelativeUrls.tilaajavastuu.supervisor),
                adminSettings: this.joinUrl(domainNames.tilaajavastuu, pageLinkRelativeUrls.tilaajavastuu.adminSettings)
            },
            competency: {
                home: this.joinUrl(domainNames.competency, pageLinkRelativeUrls.competency.home)
            },
            qat: {
                home: this.joinUrl(domainNames.qat, pageLinkRelativeUrls.qat.home)
            },
            publicWebsite: {
                home: this.joinUrl(domainNames.publicWebsite, pageLinkRelativeUrls.publicWebsite.home)
            },
            qatAccessTools: {
                home: this.joinUrl(domainNames.qatAccessTools, pageLinkRelativeUrls.qatAccessTools.home)
            }
        };

        return urls;
    }

    getCurrentEnvironmentCached() {

        if (!this.currentEnvironmentCached) {
            this.currentEnvironmentCached = this.getCurrentEnvironment();
        }

        return this.currentEnvironmentCached;
    }

    getCurrentEnvironment() {

        let currentUrl = window.location.href;

        for (let environmentKey of Object.keys(constants.domainNamesForEnvironments)) {
            let environment = constants.domainNamesForEnvironments[environmentKey];

            for (let environmentPortalKey of Object.keys(environment)) {
                let domainName = environment[environmentPortalKey];

                if (domainName) {
                    let urlWithoutProtocol = domainName;
                    let urlWithHttp = this.joinUrl(domainName, '', false);
                    let urlWithHttps = this.joinUrl(domainName, '', true);

                    if (currentUrl.indexOf(urlWithoutProtocol) === 0
                        || currentUrl.indexOf(urlWithHttp) === 0
                        || currentUrl.indexOf(urlWithHttps) === 0) {
                        return {
                            key: environmentKey,
                            portalKey: environmentPortalKey
                        };
                    }
                }
            }
        }

        return {
            key: "live",
            portalKey: "sp"
        };
    }

    joinUrl(domainName, relativeUrl, withoutSSL) {
        let protocolPrefix = withoutSSL ? "http://" : "https://";
        return protocolPrefix + domainName + relativeUrl;
    }
}

export default StateHelpers;
