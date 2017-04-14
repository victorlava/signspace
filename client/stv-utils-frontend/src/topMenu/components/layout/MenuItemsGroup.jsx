import React from 'react';

class MenuItemsGroup extends React.Component {
    render() {
        let mainClassName = "navbar-nav";
        return (
            <ul id={this.props.id} className={mainClassName}>
                {this.props.children}
            </ul>
        );
    }
}

export default MenuItemsGroup;
