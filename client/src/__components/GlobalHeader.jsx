import React from 'react';

import CommonHeader from './GlobalHeader/CommonHeader';
import NavigationBar from './GlobalHeader/NavigationBar';


export default class GlobalHeader extends React.Component {
    render () {
        return (
            <header className="global-header">
                <CommonHeader /> 
                <NavigationBar />
                <button className="btn btn-primary">test</button>
            </header>
        );
    }
}
