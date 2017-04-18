import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.scss';


export class CaseHeader extends Component {

    static propTypes = {
        case: PropTypes.object.isRequired,
    }

    handleRemoveSpace(e) {
        e.preventDefault();
        e.currentTarget.remove();
        {/* TODO: remove space from data model */}
    }

    handleRemoveLabel(e) {
        e.preventDefault();
        e.currentTarget.remove();
        {/* TODO: remove label from data model */}
    }

    handleAddSpace(e) {
        e.preventDefault();
        {/* TODO: add space to data model */}
    }

    handleAddLabel(e) {
        e.preventDefault();
        {/* TODO: add label to data model */}
    }
  
    render() {
        let privacy;
        if (this.props.case.privacy == 'PUBLIC') {
          privacy = (
              <i className="fa fa-unlock"></i>
          ); 
        }
        else if (this.props.case.privacy == 'PRIVATE') {
          privacy = (
              <i className="fa fa-lock"></i>
          );
        };
        return (
            <div styleName="root">
                <div className="row">
                    <div className="col-9">
                        <div styleName="title">   
                            <h3>{ privacy } {this.props.case.title}</h3>
                        </div>
                        <div styleName="labels">
                            <ul className="list list-inline list-label">
                                {/* TODO: loop <For each="child" of={this.props.spaces}> ? */}
                                <li onClick={this.handleRemoveSpace}>
                                    <button className="btn btn-info btn-round btn-xs">
                                        <i className="fa fa-folder-open"></i> 
                                        <span>Espoo business park</span>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </li>
                                { /* </For> */ }
                                <li onClick={this.handleSpace}>
                                    <button className="btn btn-outline-info btn-round btn-xs">
                                        <i className="fa">+</i>
                                        <i className="fa fa-folder-open"></i>
                                        <span>Add space</span>
                                    </button>
                                </li>
                            </ul>
                            <ul className="list list-inline list-label">
                                {/* TODO: loop <For each="child" of={this.props.labels}> ? */}
                                <li onClick={this.handleRemoveLabel}>
                                    <button className="btn btn-secondary btn-round btn-xs">
                                        <span>ebp</span>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </li>
                                <li onClick={this.handleRemoveLabel}>
                                    <button className="btn btn-secondary btn-round btn-xs">
                                        <span>site a</span>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </li>
                                <li onClick={this.handleRemoveLabel}>
                                    <button className="btn btn-secondary btn-round btn-xs">
                                        <span>2017</span>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </li>
                                <li onClick={this.handleRemoveLabel}>
                                    <button className="btn btn-secondary btn-round btn-xs">
                                        <span>meeting minutes</span> 
                                        <i className="fa fa-times"></i>
                                    </button>
                                </li>
                                { /* </For> */ }
                                <li onClick={this.handleAddLabel}> 
                                    <button className="btn btn-outline-secondary btn-round btn-xs">
                                        <i className="fa">+</i> Add label  {/* No need to loop for "add label" button */}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-3">
                        <div styleName="see" className="float-right">
                            { /* TODO: switch icon to material */}
                            <i className="fa fa-user"></i> <a href="#">Who can see this</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
