import React from 'react';
import messageDefinitions from '../../localizations/MessageDefinitions.js';
import { intlShape } from 'react-intl';

class MenuDropDownSelectableItem extends React.Component {
    render() {
        if (this.props.isHidden) {
            return null;
        }

        const { formatMessage } = this.context.intl;

        let iconClass = "fa fa-check fa-grey selected-language-icon-hidden";

        if (this.props.isSelected) {
            iconClass = "fa fa-check fa-grey";
        }
        return (
            <a
                role="button"
                id={this.props.id}
                className="dropdown-item with-icon"
                href={this.props.url}
                onClick={this.props.onClick}
                title={this.props.text}
            >
                <i id={this.props.id + '_checked'} className={iconClass} aria-hidden="true"></i>
                <span id={this.props.id + '_text'}>
                    {this.props.text}
                {this.props.markedAsAdmin && this.props.markedAsAdmin.length && this.props.markedAsAdmin.indexOf(this.props.index) > -1
                    ? <span className="representing-as-admin">{formatMessage(messageDefinitions.representingAsAdmin)}</span>
                    : null
                }
                </span>
            </a>
        );
    }
}

MenuDropDownSelectableItem.contextTypes = {
    intl: intlShape.isRequired
};

export default MenuDropDownSelectableItem;
