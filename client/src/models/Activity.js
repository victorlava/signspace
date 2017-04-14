import {observable} from 'mobx';
import {newID} from 'utils.js';
import {PUBLIC, MESSAGE} from 'constants.js';


export class Activity {
    @observable id = newID();
    @observable case_id = null;
    @observable case_title = null;
    @observable created = null;
    @observable type = MESSAGE;
    @observable privacy = PUBLIC;
    @observable to = [];
    @observable text = '';
    @observable parent_id = null;
    @observable sent_from = null;
    @observable attachments = [];
}
