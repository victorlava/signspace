import {observable, action} from 'mobx';


export class DocumentStore {

    @observable objects = [];
    @observable isLoading = true;

    constructor(transport) {
        this.transport = transport;
    }

    load() {
        return this.transport.get('/documents')
            .then((res) => res.json())
            .then(action('DocumentStore.load', (json) => {
                this.objects = json.data;
                this.isLoading = false;
            }));
    }

}
