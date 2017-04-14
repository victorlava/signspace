import {observable, action} from 'mobx';


export class CaseStore {

    @observable objects = [];
    @observable isLoading = true;

    constructor(transport) {
        this.transport = transport;
    }

    load() {
        return this.transport.get('/cases')
            .then((res) => res.json())
            .then(action('CaseStore.load', (json) => {
                this.objects = json.data;
                this.isLoading = false;
            }));
    }

    createCase(data) {
        return this.transport.post('/cases', data);
    }

}
