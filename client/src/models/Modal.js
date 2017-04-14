import {observable, action} from 'mobx';
import autobind from 'autobind-decorator';


@autobind
export class Modal {

    @observable isOpen = false;

    @action open() {
        this.isOpen = true;
    }

    @action close() {
        this.isOpen = false;
    }

    onRequestClose() {
        this.close();
    }

}
