import { defineMessages } from 'react-intl';

const messageDefinitions = defineMessages({
    sp: {
        id: 'home',
        description: 'Home item',
        defaultMessage: 'Home'
    },
    taxnumber: {
        header: {
            id: 'taxnumber.header',
            description: 'Taxnumber header item',
            defaultMessage: 'Veronumero.fi'
        },
        report: {
            id: 'taxnumber.report',
            description: 'Taxnumber report item',
            defaultMessage: 'Reports'
        },
        register: {
            id: 'taxnumber.register',
            description: 'Building site register item',
            defaultMessage: 'Building site register'
        }
    },
    tilaajavastuu: {
        header: {
            id: 'tilaajavastuu.header',
            description: 'Tilaajavastuu header item',
            defaultMessage: 'Tilaajavastuu.fi'
        },
        report: {
            id: 'tilaajavastuu.report',
            description: 'Tilaajavastuu report item',
            defaultMessage: 'Reports'
        },
        supervisor: {
            id: 'tilaajavastuu.supervisor',
            description: 'Tilaajavastuu supervisor item',
            defaultMessage: 'Supervisor'
        }
    },
    adminTools: {
        header: {
            id: 'adminTools.header',
            description: 'Admin tools header item',
            defaultMessage: 'Admin tools'
        },
        qvarnAccessTools: {
            id: 'adminTools.qvarnAccessTools',
            description: 'Qvan access tools item',
            defaultMessage: 'Qvarn Access Tool'
        }
    },
    competency: {
        id: 'competency',
        description: 'Competency item',
        defaultMessage: 'Competency register'
    },
    qat: {
        id: 'qat',
        description: 'QAT item',
        defaultMessage: 'Qvarn Access Tool'
    },
    changeLanguage: {
        id: 'changeLanguage',
        description: 'Change language item',
        defaultMessage: 'Change language'
    },
    languages: {
        fi: {
            id: 'languages.fi',
            description: 'Finnish language',
            defaultMessage: 'Suomi'
        },
        sv: {
            id: 'languages.sv',
            description: 'Swedish language',
            defaultMessage: 'Svensk'
        },
        et: {
            id: 'languages.et',
            description: 'Estonian language',
            defaultMessage: 'Eesti'
        },
        en: {
            id: 'languages.en',
            description: 'English language',
            defaultMessage: 'English'
        }
    },
    userDetails: {
        id: 'userDetails',
        description: 'User details item',
        defaultMessage: 'Your details'
    },
    changePassword: {
        id: 'changePassword',
        description: 'Change password item',
        defaultMessage: 'Change password'
    },
    signIn: {
        id: 'signIn',
        description: 'Sign in item',
        defaultMessage: 'Sign in'
    },
    signOut: {
        id: 'signOut',
        description: 'Sign out item',
        defaultMessage: 'Sign out'
    },
    organizationInfo: {
        id: 'organizationInfo',
        description: 'Organization info item',
        defaultMessage: 'Organisation info'
    },
    users: {
        id: 'users',
        description: 'Users item',
        defaultMessage: 'User management'
    },
    switchRepresentatedOrg: {
        id: 'switchRepresentatedOrg',
        description: 'Represented organizations item',
        defaultMessage: 'Switch organization account'
    },
    goToRepresentatedOrg: {
        id: 'goToRepresentatedOrg',
        description: 'Represented organizations item',
        defaultMessage: 'Go to organization account'
    },
    backToPublicWebsite: {
        id: 'backToPublicWebsite',
        description: 'Back to public website item',
        defaultMessage: 'Back to tilaajavastuu.fi'
    },
    registerNewOrganization: {
        id: "registerNewOrganization",
        description: 'Register a new organisation item',
        defaultMessage: 'Register a new organisation'
    },
    noCompanySelected: {
        id: "noCompanySelected",
        description: 'No company selected text',
        defaultMessage: 'No company selected'
    },
    representingAsAdmin: {
        id: "representingAsAdmin",
        description: "Representing as service portal administrator",
        defaultMessage: "Representing as service portal administrator"
    },
    showAllOrganizations: {
        id: "showAllOrganizations",
        description: "Show all organizations",
        defaultMessage: "Show all {orgCount}"
    },
    showAllOrganizationsAsAdmin: {
        id: "showAllOrganizationsAsAdmin",
        description: "Show all organizations as admin",
        defaultMessage: "Search all {orgCount}"
    }
});

export default messageDefinitions;
