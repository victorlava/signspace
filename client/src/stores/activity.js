import {observable, action} from 'mobx';


export class ActivityStore {

    @observable objects = [];
    @observable isLoading = true;

    constructor(transport) {
        this.transport = transport;
    }

    load() {
        return this.transport.get('/activities')
            .then((res) => res.json())
            .then(action('ActivityStore.load', (json) => {
                this.objects = json.data;
                this.isLoading = false;
            }));
    }

    createActivity(activity) {
        return this.transport.post('/activities', {activity});
    }

}
