import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {CommonHeader} from './CommonHeader';
import {TopMenu} from './TopMenu';
import {SearchBar} from './SearchBar';


export class Page extends Component {

    static propTypes = {
        children: PropTypes.node,
        url: PropTypes.string,
    }

    render() {
        return (
            <div>
                <CommonHeader />
                <TopMenu activeLinkUrl={this.props.url} />
                {this.props.children}
            </div>
        );
    }

}
