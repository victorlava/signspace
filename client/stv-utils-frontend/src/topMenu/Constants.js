const constants = {
    pageLinkRelativeUrlOrgIdPlaceholder: "[ORG_ID]",
    pageLinkRelativeUrlSyncIdPlaceholder:"[SYNC_ID]",
    pageLinkRelativeUrls: {
        sp: {
            home: "/#/",
            organizationHome: "/#/[ORG_ID]/home",
            organizationinfo: "/#/[ORG_ID]/organization/overview",
            users: "/#/[ORG_ID]/organization/users",
            userDetails: "/#/profile/basic-details",
            changePassword: "/#/profile/changepassword",
            registerNewOrganization: "/#/registration/findcompany",
            organizations: "/#/organizations"
        },
        taxnumber: {
            report: "/ilmoita/ilmoita-tyontekijat-2/",
            register: "/tyomaarekisteri/tyomaarekisteri-sovellus/#perustiedot"
        },
        tilaajavastuu: {
            report: "",
            supervisor: "/tilaajavastuu.fi/ea/earkisto.jsf",
            adminSettings: "/tilaajavastuu.fi/maintenance/editcompany.jsf?companyid=[SYNC_ID]"
        },
        competency: {
            home: "/orgs/[ORG_ID]/competences"
        },
        qat: {
            home: "/"
        },
        publicWebsite: {
            home: "/#"
        },
        qatAccessTools:{
            home:""
        }

    },
    domainNamesForEnvironments: {
        live: {
            sp: "portal.tilaajavastuu.fi",
            taxnumber: "www.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "taito.tilaajavastuu.fi",
            qat: "qat.tilaajavastuu.fi",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        vaultitBeta: {
            sp: "portal.beta.tilaajavastuu.fi",
            taxnumber: "devel-www.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "taito.beta.tilaajavastuu.fi",
            qat: "qat.beta.tilaajavastuu.fi",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.beta.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        vaultitAlpha: {
            sp: "portal.alpha.tilaajavastuu.fi",
            taxnumber: "devel-www.veronumero.fi",
            tilaajavastuu: "devel-raportit.tilaajavastuu.fi",
            competency: "taito.alpha.tilaajavastuu.fi",
            qat: "qat.alpha.tilaajavastuu.fi",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.alpha.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        gamma: {
            sp: "gamma-portal.tilaajavastuu.fi",
            taxnumber: "www.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "taito.gamma.tilaajavastuu.fi",
            qat: "qat.gamma.tilaajavastuu.fi",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        beta: {
            sp: "beta-portal.tilaajavastuu.fi",
            taxnumber: "beta.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "taito.beta.tilaajavastuu.fi",
            qat: "qat.beta.tilaajavastuu.fi",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        alpha: {
            sp: "alpha-portal.tilaajavastuu.fi",
            taxnumber: "devel-www.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "taito.alpha.tilaajavastuu.fi",
            qat: "qat.alpha.tilaajavastuu.fi",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.alpha.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        robot: {
            sp: "robot-portal.tilaajavastuu.fi",
            taxnumber: "devel-www.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "robot-taito-1.tilaajavastuu.io",
            qat: "robot-qat-1.tilaajavastuu.io",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        devrobot: {
            sp: "devrobot-portal.tilaajavastuu.fi",
            taxnumber: "devel-www.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "dev-taito-1.tilaajavastuu.io",
            qat: "dev-taito-1.tilaajavastuu.io",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        },
        dev: {
            sp: "localhost:8080",
            taxnumber: "devel-www.veronumero.fi",
            tilaajavastuu: "raportit.tilaajavastuu.fi",
            competency: "taitowebappclient:3333",
            qat: "qatclient:3333",
            publicWebsite: "tilaajavastuu.fi",
            qatAccessTools:"qat.alpha.tilaajavastuu.fi",
            buildingSiteRegistryRegistrationLink: "https://www.veronumero.fi/kayttooikeudet/#tyomaarekisteri"
        }
    }
};

export default constants;
