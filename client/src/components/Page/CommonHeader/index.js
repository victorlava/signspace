import React, {Component} from 'react';
//import CSSModules from 'react-css-modules';
import logo from './logo.png';
 
import styles from './styles.scss'; 

//@CSSModules(styles)
export class CommonHeader extends Component {

    render() {
        return (
            <div styleName="root"> 
                <nav className="navbar navbar-toggleable-md">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> 

                    <a className="navbar-brand" href="/">
                        <img className="logo" src={logo} />
                    </a>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown"> 
                                <a className="nav-link dropdown-toggle" href="#" id="signSpaceDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                SignSpace
                                </a>
                                <div className="dropdown-menu" aria-labelledby="signSpaceDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                </div>
                            </li> 
                        </ul> 

                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">  
                                <a className="nav-link dropdown-toggle" href="#" id="constructionDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                SKL Construction
                                </a>
                                <div className="dropdown-menu" aria-labelledby="constructionDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                </div>
                            </li> 
                            <li className="nav-item dropdown">  
                                <a className="nav-link dropdown-toggle" href="#" id="personDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user i-menu"></i> Lucas Andersson
                                </a> 
                                <div className="dropdown-menu" aria-labelledby="personDropdown">
                                    <a className="dropdown-item" href="#">Action</a>
                                </div>
                            </li> 
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

}
