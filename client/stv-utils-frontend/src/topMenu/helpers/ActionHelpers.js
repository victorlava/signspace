class ActionHelpers {

    constructor(topMenuProps) {
        this.topMenuProps = topMenuProps;
    }

    getLanguagesOnClickHandler(langCode) {
        let topMenuProps = this.topMenuProps;
        let languagesOnClickHandler = function (event) {
            event.preventDefault();
            topMenuProps.onLanguageChanged(langCode);
        }

        return languagesOnClickHandler;
    }

    getOnSignInClickHandler() {
        let topMenuProps = this.topMenuProps;
        let onSignInClickHandler = function (event) {
            event.preventDefault();
            topMenuProps.onSignInClicked();
        }

        return onSignInClickHandler;
    }

    getOnSignOutClickHandler() {
        let topMenuProps = this.topMenuProps;
        let onSignOutClickHandler = function (event) {
            event.preventDefault();
            topMenuProps.onSignOutClicked();
        }

        return onSignOutClickHandler;
    }

    getRepresentationClickHandler(index) {
        let topMenuProps = this.topMenuProps;
        let representationClickHandler = function (event) {
            event.preventDefault();
            topMenuProps.onSelectedRepresentationChanged(index);
        }

        return representationClickHandler;
    }

    getOnServiceLinkClickHandler(showModal) {
        let topMenuProps = this.topMenuProps;
        let serviceLinkClickHandler = function (event) {
            event.preventDefault();
            topMenuProps.onServiceLinkClicked(showModal);
        }
        return serviceLinkClickHandler;
    }
}

export default ActionHelpers;
