import React, {Component} from 'react';

import './styles.scss'; 


export class Switcher extends Component {

    render() {
        return ( 
            <div styleName="root"> 
                <ul>  
                    <li> 
                        <a href="#" className="btn btn-outline-secondary btn-round btn-sm">
                            <i className="fa fa-align-left"></i> Case list
                        </a>
                    </li>
                    <li> 
                        <a href="#" className="btn btn-secondary btn-round btn-sm">
                            <i className="fa fa-list-ul"></i> Activity list 
                        </a> 
                    </li>
                </ul>
            </div>
        );
    }

}
