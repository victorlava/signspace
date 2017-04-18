import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {action, computed, observable} from 'mobx';
import {observer, PropTypes as MobxPropTypes} from 'mobx-react';

import {Case} from 'models/Case';
import {Activity} from 'models/Activity';
import {PrivacySelector} from 'components/PrivacySelector';
import {FileUpload} from 'components/FileUpload';
import {PostTo} from 'components/PostTo';
import './styles.scss';

@observer
@autobind
export class Message extends Component {

    static propTypes = {
        activity: MobxPropTypes.observableObject.isRequired,
        showPrivacySelector: PropTypes.bool.isRequired,
        submitButtonText: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,  // TODO: change to onCreate
    }

    @observable attachedFiles = [];

    componentDidMount() {
        this.text.focus();
    }

    @action handleUpload(files) {
        this.attachedFiles = files;
        this.props.activity.attachments = files.map((f) => f.id);
    }

    @action handleChange(e) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.props.activity[e.target.name] = value;
    }

    @action handleToChange(value) {
        this.props.onChange(value);
    }

    handleOnAttachmentIconClick(e) {
        this.fileupload.open();
    }

    render() {
        return (
            <div styleName="root">
                <div className="input-group">
                    {/*<input placeholder="Addressed to" />*/}
                    <PostTo
                        value={this.props.activity.to}
                        onChange={this.handleToChange}
                    />
                </div>
                <div className="input-group">
                    <FileUpload
                        ref={(node) => { this.fileupload = node; }}
                        styleName="fileupload-dropzone"
                        onUpload={this.handleUpload}>
                        Drop Here
                    </FileUpload>
                    <textarea
                        name="text"
                        ref={(ref) => { this.text = ref; }}
                        value={this.props.activity.text}
                        onChange={this.handleChange}
                        placeholder="Your message"
                    />
                </div>

                <div>
                    <For each="file" of={this.attachedFiles}>
                        <span key={file.id} styleName="attached-file">
                            <a href={'/api/v1/document/' + file.id} target="_blank">{file.filename}</a><br />
                        </span>
                    </For>
                </div>

                <If condition={this.props.showPrivacySelector}>
                    <PrivacySelector
                        value={this.props.activity.privacy}
                        onChange={this.handleChange}
                    />
                </If>
                <div styleName="create" className="row">
                    <div styleName="icons" className="col-6">
                        <ul>
                            <li className="icon" onClick={this.handleOnAttachmentIconClick}>
                                <i className="fa fa-paperclip"></i>
                            </li>
                            <li className="icon">
                                <i className="fa fa-link"></i>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6">
                        <button className="btn btn-warning btn-sm float-right" onClick={this.props.onSubmit}>
                            {this.props.submitButtonText}
                        </button>
                        <p><small>This message will be public</small></p>
                    </div>
                </div>
            </div>
        );
    }

}
