import React from 'react';

class MenuDropDown extends React.Component {
    render() {
        let iconComponent = null;
        let pushMenuToRight = '';

        if (this.props.iconClass) {
            iconComponent = (<i id={this.props.id + '_icon'} className={this.props.iconClass} aria-hidden="true"></i>);
        }

        if(this.props.dropdownMenuRight){
            pushMenuToRight = ' dropdown-menu-right';
        }

        let linkClassName = 'nav-link dropdown-toggle';

        return (
            <li className="nav-item dropdown">
                <a
                    id={this.props.id}
                    className={linkClassName + (iconComponent ? ' with-icon':'')}
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    title={this.props.text}
                >
                    {iconComponent}
                    <span id={this.props.id + '_text'} >{this.props.text}</span>
                </a>
                <div className={"dropdown-menu" + pushMenuToRight} aria-labelledby="Preview">
                    {this.props.children}
                </div>
            </li>
        );
    }
}

export default MenuDropDown;
