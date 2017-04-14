import React from 'react';
import { intlShape } from 'react-intl';
import MainLogo from '../images/tilaajavastuu.png';
import YoutubeImage from '../images/youtube.png';
import TwitterImage from '../images/twitter.png';
import FacebookImage from '../images/facebook.png';
import LinkedinImage from '../images/linkedin.png';
import Constants from '../Constants.js';
import messageDefinitions from '../localizations/MessageDefinitions.js';
import $ from 'jquery';

class Footer extends React.Component {

    componentDidMount() {
        if(this.props.pushToBottom){
            this.pushFooter();
        }
    }

    pushFooter(){
        let footer = $('.stv-footer');
        let footerParent  = footer.parent();
        let reactRootElement = null;

        if(typeof footerParent.data('reactroot') !== 'undefined'){
            reactRootElement = footerParent;
            footerParent = footerParent.parent();
        }

        let body = footerParent.parent();

        if(!body.is('body')){
            throw new Error('<Footer /> element must be placed inside wrapper body > div.container > <Footer />');
        }

        $('html').addClass('push-stv-footer');

        if(reactRootElement){
            footerParent.addClass('stv-footer-extend');
            reactRootElement.addClass('stv-footer-parent');

            reactRootElement.css({
                'padding-bottom': footer.outerHeight() + 'px'
            });
        } else {
            footerParent.addClass('stv-footer-parent');
            footerParent.css({
                'padding-bottom': footer.outerHeight() + 'px'
            });
        }

        window.addEventListener("resize", () => {
            this.updatePushedFooter(reactRootElement ? reactRootElement:footerParent);
        });

    }

    updatePushedFooter(element){
        let footer = $('.stv-footer');
        element.css({
            'padding-bottom': footer.outerHeight() + 'px'
        });
    }

    render() {

        const { formatMessage } = this.context.intl;

        return (
            <div className="stv-footer container">
                <div className="row">
                    <div className="col-xl-2 col-lg-3 col-sm-6 d-flex align-items-center">
                        <img className="img-fluid" src={MainLogo} alt="Tilaajavastuu" title="Tilaajavastuu" />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-sm-6">
                        <h3 className="font-weight-bold">{formatMessage(messageDefinitions.contacts.title)}</h3>
                        <ul className="list-unstyled">
                            <li>{formatMessage(messageDefinitions.contacts.address1)}</li>
                            <li>{formatMessage(messageDefinitions.contacts.address2)}</li>
                            <li>{formatMessage(messageDefinitions.contacts.address3)}</li>
                        </ul>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-sm-6">
                        <h3 className="font-weight-bold">{formatMessage(messageDefinitions.service.title)}</h3>
                        <ul className="list-unstyled">
                            <li>{formatMessage(messageDefinitions.service.email)}</li>
                            <li>{formatMessage(messageDefinitions.service.phone)}</li>
                            <li>{formatMessage(messageDefinitions.service.time)}</li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-sm-6">
                        <ul className="list-unstyled">
                            <li>
                                <a href={Constants.menuLinks[this.props.selectedLanguage].termsOfUse}>
                                    {formatMessage(messageDefinitions.menu.termsOfUse)}
                                </a>
                            </li>
                            <li>
                                <a href={Constants.menuLinks[this.props.selectedLanguage].description}>
                                    {formatMessage(messageDefinitions.menu.description)}
                                </a>
                            </li>
                            <li>
                                <a href={Constants.menuLinks[this.props.selectedLanguage].obligations}>
                                    {formatMessage(messageDefinitions.menu.obligations)}
                                </a>
                            </li>
                            <li>
                                <a href={Constants.menuLinks[this.props.selectedLanguage].media}>
                                    {formatMessage(messageDefinitions.menu.media)}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-lg-12 col-sm-12 text-xl-right text-sm-center">
                        <div className="social-links">
                            <a className="twitter" href={Constants.socialLinks.twitter}>
                                <img src={TwitterImage} alt="Twitter" title="Twitter" />
                            </a>
                            <a className="facebook" href={Constants.socialLinks.facebook}>
                                <img src={FacebookImage} alt="Facebook" title="Facebook" />
                            </a>
                            <a className="linkedin" href={Constants.socialLinks.linkedin}>
                                <img src={LinkedinImage} alt="Linkedin" title="Linkedin" />
                            </a>
                            <a className="youtube" href={Constants.socialLinks.youtube}>
                                <img src={YoutubeImage} alt="Youtube" title="Youtube" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Footer.contextTypes = {
    intl: intlShape.isRequired
};

export default Footer;
