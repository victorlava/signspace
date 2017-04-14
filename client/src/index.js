import React from 'react';
import ReactDOM from 'react-dom';
import {useStrict} from 'mobx';

import './polyfill';
import './styles/main.scss';
import {App} from './components/App';
import {CaseStore} from './stores/case';
import {ActivityStore} from './stores/activity';
import {DocumentStore} from './stores/document';
import {UIStore} from './stores/ui';
import {UserStore} from './stores/user';
import {Transport} from './transport';


// MobX strict mode
useStrict(true);


const transport = new Transport('/api/v1');


window.stores = {
    caseStore: new CaseStore(transport),
    activityStore: new ActivityStore(transport),
    documentStore: new DocumentStore(transport),
    uiStore: new UIStore(),
    userStore: new UserStore(transport),
};


ReactDOM.render(
    <App stores={window.stores} />,
    document.getElementById('app')
);
