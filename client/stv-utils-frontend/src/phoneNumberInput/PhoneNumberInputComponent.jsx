import React from 'react';
import 'intl-tel-input';
import $ from 'jquery';

class PhoneNumberInput extends React.Component {

    componentDidMount() {
        let componentInstance = this;
        let id = this.props.id;
        let initialCountryCode = this.props.initialCountry;
        let preferredCountries = this.props.preferredCountries;

        let countries = $.fn.intlTelInput.getCountryData();
        var initialCountryExists = countries.filter(function(country) {
            return country.iso2 == initialCountryCode;
        }).length > 0;

        if (!initialCountryExists) {
            initialCountryCode = "";
        }

        $("#"+ id).intlTelInput({
            preferredCountries: preferredCountries,
            initialCountry: initialCountryCode,
            autoHideDialCode: true,
            formatOnInit: false,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/9.2.3/js/utils.js"
        });

        $("#"+ id).on("countrychange", function (event) {
            // HACK. There was no event after country code changed.
            setTimeout(function() {
                componentInstance.onAnyChange(event);
            }, 100);
        });
    }

    onAnyChange(e) {

        let id = this.props.id;
        let onChangeHandler = this.props.onChange;

        let element = $("#" + id);

        let isValidNumber = element.intlTelInput("getNumber") ? element.intlTelInput("isValidNumber") : true;

        e.target.additionalInfo = {
            fullNumber: element.intlTelInput("getNumber"),
            isValid: isValidNumber
        };

        onChangeHandler(e);
    }

    render() {

        let componentInstance = this;
        let id = this.props.id;
        let className = this.props.className;
        let value = this.props.value;

        let onChange = function (event) {
            componentInstance.onAnyChange(event);
        }

        return (
            <input type="tel" id={id} className={className} value={value} onChange={onChange} />
        );
    }
}

PhoneNumberInput.propTypes = {
    id: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    value: React.PropTypes.string,
    initialCountry: React.PropTypes.string,
    preferredCountries: React.PropTypes.array,
    onChange: React.PropTypes.func
};

export default PhoneNumberInput;