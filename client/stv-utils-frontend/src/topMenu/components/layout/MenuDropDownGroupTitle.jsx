import React from 'react';

class MenuDropDownGroupTitle extends React.Component {
    render() {
        return (
            <div id={this.props.id} className="dropdown-header">{this.props.text}</div>
        );
    }
}

export default MenuDropDownGroupTitle;
