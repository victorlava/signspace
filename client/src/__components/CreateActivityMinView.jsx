/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import autobind from 'autobind-decorator';


@observer
@autobind
export class CreateActivityMinView extends React.Component {

    constructor(props) {
        super(props);
        window.create_activity_min_view = this;
    }

    @observable is_shown = true;

    @action show() {
        this.is_shown = true;
    }

    @action hide() {
        this.is_shown = false;
    }

    handleClick() {
        this.hide(); 
        window.create_activity_view.show();
    }

    render () {
        const display = this.is_shown ? 'block' : 'none';
        return (
            <div className="create-activity-min-view" style={{display}} onClick={this.handleClick}>
                <div className="new-activity-btn" style={{background: '#fff', padding: '4px'}}>
                    Add a new activity
                </div>
            </div>
        );
    }
}
