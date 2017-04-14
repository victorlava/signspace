const constants = {
    supportedLanguages: ['en', 'et', 'fi', 'sv'],
    projects: [
        {
            name: 'service-portal',
            filesLocation: '../../service-portal/client/app/localizations/',
            type: 'json',
            searchPatern: '*.json',
            textSepparator: false,
            onlyCopy: false,
            includeOnly: [],
            excludeOnly: []
        },
        {
            name: 'stv-utils-operators',
            filesLocation: null,
            type: 'po',
            textSepparator: false,
            searchPatern: null,
            files: {
                en: null,
                et: "../../stv-utils/stv/locale/et/LC_MESSAGES/stv.classifiers.billing_operators.po",
                fi: "../../stv-utils/stv/locale/fi/LC_MESSAGES/stv.classifiers.billing_operators.po",
                sv: "../../stv-utils/stv/locale/sv/LC_MESSAGES/stv.classifiers.billing_operators.po"
            },
            onlyCopy: false,
            includeOnly: [],
            excludeOnly: []
        },
        {
            name: 'stv-utils-permissions',
            filesLocation: null,
            type: 'po',
            textSepparator: false,
            searchPatern: null,
            files: {
                en: null,
                et: "../../stv-utils/stv/locale/et/LC_MESSAGES/stv.classifiers.global_permissions.po",
                fi: "../../stv-utils/stv/locale/fi/LC_MESSAGES/stv.classifiers.global_permissions.po",
                sv: "../../stv-utils/stv/locale/sv/LC_MESSAGES/stv.classifiers.global_permissions.po"
            },
            onlyCopy: false,
            includeOnly: [],
            excludeOnly: []
        },
        {
            name: 'stv-utils-frontend-topMenu',
            filesLocation: '../../stv-utils-frontend/src/topMenu/localizations/',
            type: 'json',
            textSepparator: false,
            searchPatern: '*.json',
            onlyCopy: false,
            includeOnly: [],
            excludeOnly: []
        },
        {
            name: 'stv-utils-frontend-footer',
            filesLocation: '../../stv-utils-frontend/src/footer/localizations/',
            type: 'json',
            textSepparator: false,
            searchPatern: '*.json',
            onlyCopy: false,
            includeOnly: [],
            excludeOnly: []
        },
        {
            name: 'email-templates',
            filesLocation: '../../stv-viestikeskus-templates/templates/src/locales/',
            type: 'json',
            textSepparator: false,
            searchPatern: '*.json',
            onlyCopy: false,
            includeOnly: [],
            excludeOnly: []
        },
        {
            name: 'service-portal-terms-of-service-popup-html',
            filesLocation: '../../service-portal/client/app/htmlTemplates/termsOfService/',
            type: 'html',
            textSepparator: false,
            searchPatern: '*.html',
            onlyCopy: true,
            includeOnly: [],
            excludeOnly: []
        },
        {
            name: 'gluu-login-screen-translations',
            filesLocation: '../../gluu/Server/src/main/resources/',
            type: 'properties',
            textSepparator: '=',
            searchPatern: 'messages*.properties',
            onlyCopy: false,
            includeOnly: [
                'login.documentTitle',
                'login.pageTitle',
                'login.username',
                'login.password',
                'login.errorMessage',
                'login.errorSessionInvalidMessage',
                'login.login',
                'login.createAccount',
                'login.forgotPassword',
                'login.customerServiceContacts'
                ],
            excludeOnly: []
        }
    ],
    buildDirectory: './build/'
};

module.exports = {
    constants: constants
}