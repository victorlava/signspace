import React from 'react';

class MenuDropDownSeparator extends React.Component {
    render() {
        return (
            <div id={this.props.id} role="separator" className="dropdown-divider"></div>
        );
    }
}

export default MenuDropDownSeparator;
