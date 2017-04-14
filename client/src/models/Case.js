import {observable} from 'mobx';
import {newID} from 'utils.js';
import {PUBLIC} from 'constants.js';


export class Case {
    id = newID();
    @observable title = '';
    @observable privacy = PUBLIC;
}
