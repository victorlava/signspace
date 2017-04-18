import autobind from 'autobind-decorator';
import React from 'react';
import PropTypes from 'prop-types';
import {observable, action, computed} from 'mobx';
import {observer} from 'mobx-react';

import Dropzone from 'react-dropzone';

import './styles.scss';


@observer
@autobind
export class FileUpload extends Dropzone {

    static propTypes = {
        ...Dropzone.propTypes,
        onUpload: PropTypes.func
    }

    static defaultProps = {
        onUpload: () => {}
    }

    @observable uploadedFiles = [];
    @observable dragInProgress = false;

    @action appendUploadedFiles(files) {
        files.forEach(action('appendUploadedFiles', (file) => {
            this.uploadedFiles.push(file);
        }));

        this.props.onUpload(this.uploadedFiles);
    }

    @computed get dropzoneDisplay() {
        return this.dragInProgress ? 'block' : 'none';
    }

    @action handleDragEnter(e) {
        e.preventDefault();
        if (this.dragInProgress) {
            return;
        }
        this.dragInProgress = true;
        console.log('drag start'); 
    }

    @action handleDragEnd(e) {
        if ( ! this.dragInProgress) {
            return;
        }
        this.dragInProgress = false;
        console.log('drag end'); 
    }

    componentWillMount() {
        document.addEventListener('dragenter', this.handleDragEnter, false);
        document.addEventListener('drop', this.handleDragEnd, false);
        document.addEventListener('mouseout', this.handleDragEnd, false);
    }

    componentWillUnmount() {
        document.removeEventListener('dragenter', this.handleDragEnter, false);
        document.removeEventListener('drop', this.handleDragEnd, false);
        document.removeEventListener('mouseout', this.handleDragEnd, false);
    }

    handleOnDrop(acceptedFiles, rejectedFiles) {
        let data = new FormData();

        acceptedFiles.forEach(function(file, i) {
            data.append(`files[${i}]`, file);
        });

        fetch('/api/v1/document', {
            method: 'POST',
            body: data,
        }).then((res) => {
            return res.json();
        }).then((val) => {
            this.appendUploadedFiles(val.data);
        });
    }

    open() {
        this.dropzone.open();
    }

    render() {
        let props = Object.assign({}, this.props);
        Reflect.deleteProperty(props, 'onUpload');

        return (
            <div style={{display: this.dropzoneDisplay}}>
                <Dropzone {...props} onDrop={this.handleOnDrop} ref={(el) => this.dropzone = el}>
                    Drop here
                </Dropzone>
            </div>
        );
    }

}
