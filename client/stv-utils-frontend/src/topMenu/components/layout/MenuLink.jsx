import React from 'react';

class MenuLink extends React.Component {
    render() {
        return (
            <li id={this.props.id} className="nav-item">
                <a role="button" className="nav-link" href={this.props.url} onClick={this.props.onClick} title={this.props.text}>
                    {this.props.text}
                </a>
            </li>
        );
    }
}

export default MenuLink;
