import React from 'react';

class MenuDropDownItem extends React.Component {
    render() {
        let iconComponent = null;
        let className = '';

        if (this.props.iconClass) {
            iconComponent = (<i id={this.props.id + '_icon'} className={this.props.iconClass} aria-hidden="true"></i>);
        }

        if(this.props.className){
            className = ' ' + this.props.className;
        }

        return (
            <a
                role="button"
                id={this.props.id}
                className={"dropdown-item" + (iconComponent ? ' with-icon':'') + className}
                href={this.props.url}
                onClick={this.props.onClick}
                title={this.props.text}
            >
                {iconComponent}
                {this.props.text}
            </a>
        );
    }
}

export default MenuDropDownItem;
