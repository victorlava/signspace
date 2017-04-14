import React from 'react';
import Logo from './Logo.jsx';

class HorizontalMenuBar extends React.Component {
    render() {
        let className = "navbar navbar-toggleable-sm stv-primary-nav fixed-top";

        if (this.props.changeBgColor) {
            className += ' other-org';
        }

        return (
            <nav className={className}>
                <Logo id="top_menu_logo" homeUrl={this.props.urls[this.props.currentPortalKey].home} />
                <button
                    id="top_menu_collapse_button"
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapsingNavbar"
                    aria-controls="collapsingNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    &#9776;
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="collapsingNavbar">
                    {this.props.children}
                </div>
            </nav>
        );
    }
}

export default HorizontalMenuBar;
