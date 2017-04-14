import React from 'react';
import image from '../../images/tilaajavastuu.png';
class Logo extends React.Component {
    render() {
        return (
            <a role="button" id={this.props.id} className="navbar-brand" href={this.props.homeUrl}>
                <img alt="" src={image} />
            </a>
        );
    }
}

export default Logo;
