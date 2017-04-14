import React, {Component} from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {action, computed} from 'mobx';
import autobind from 'autobind-decorator';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Modal as ModalModel} from 'models/Modal';
import {Page} from 'components/Page';
import {SearchBar} from 'components/Page/SearchBar';
import {List} from './List';
import {Detail} from './Detail';
import {NewCase} from './NewCase';
import './styles.scss';

@inject('stores', 'history')
@observer
@autobind
export class Activities extends Component {

    constructor(...args) {
        super(...args);
        this.newCaseModal = new ModalModel();
        this.load();
    }

    @action load() {
        this.props.stores.activityStore.load();
        this.props.stores.caseStore.load();
        this.props.stores.documentStore.load();
    }

    @computed get defaultActivity() {
        const {objects} = this.props.stores.activityStore;
        return objects.length > 0 ? objects[0] : null;
    }

    handleNewCaseButtonClick(e) {
        e.preventDefault();
        this.newCaseModal.open();
    }

    handleModalRequestClose() {
        this.newCaseModal.onRequestClose();
    }

    handleCaseCreated() {
        const {activityStore, caseStore, documentStore} = this.props.stores;
        activityStore.load()
            .then(() => caseStore.load())
            .then(() => documentStore.load())
            .then(() => this.props.history.push('/activities/' + activityStore.objects[0].id))
            .then(() => this.newCaseModal.close());
    }

    handleModalClose(e) {
        e.preventDefault();
        this.newCaseModal.close();
    }

    render() {
        const {activityStore} = this.props.stores;
        return (
            <Page url="/activities">
                <div className="container">  
                    <main>
                        <div styleName="search" className="row">
                            <div className="col-9">
                                <SearchBar placeholder="Search activity list" />
                            </div>
                            <div className="col-3">
                                <button
                                    onClick={this.handleNewCaseButtonClick}
                                    className="btn btn-primary btn-uppercase btn-lg float-right">
                                    + New Case
                                </button>
                            </div>
                        </div>
                        <div styleName="main" className="row">
                            <div styleName="list" className="col-3"> 
                                <List activities={activityStore.objects} />
                                <If condition={this.defaultActivity}>
                                    <Redirect
                                        from="/activities"
                                        to={`/activities/${this.defaultActivity.id}`}
                                    />
                                </If>
                            </div> 
                            <div styleName="detail" className="col-9"> 
                                <Route path="/activities/:id" component={Detail} />
                            </div>
                        </div>
                    </main>

                    <Modal
                        contentLabel="New case"
                        isOpen={this.newCaseModal.isOpen}
                        portalClassName="ss-modal ss-new-case-modal"
                        onRequestClose={this.handleModalRequestClose}
                        style={{
                            content: {
                                width: '690px',
                                border: 'none',
                                background: 'none',
                                borderRadius: '5px',
                                padding: '0',
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)'
                            },
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }
                        }}>
                        <NewCase
                            onCaseCreated={this.handleCaseCreated}
                            onModalClose={this.handleModalClose} />
                    </Modal>
                </div>
            </Page>
        );
    }

}
