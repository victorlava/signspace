import {observable} from 'mobx';
import {newID} from 'utils.js';


export class User {
    id = newID();
    @observable display_name = '';
    @observable email = '';
    @observable company_name = '';
    @observable image_url = '';
}
