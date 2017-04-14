import React from 'react';
import autobind from 'autobind-decorator';
import { action } from 'mobx';
import { observer, inject } from 'mobx-react';

import CreateCaseView from './CreateCaseView';


@inject('uistore')
@observer
@autobind
export default class TopActions extends React.Component {
    static contextTypes = { uistore: React.PropTypes.object }

    @action handleNewCaseClick() {
        this.props.uistore.openModal(<CreateCaseView />);
    }

    render() {
        return (
            <div className="top-actions">
                <table>
                    <tbody>
                        <tr>
                            <td><input value="Search" /></td>
                            <td><select><option>Selected space</option></select></td>
                            <td><button onClick={this.handleNewCaseClick}>+ NEW CASE</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
