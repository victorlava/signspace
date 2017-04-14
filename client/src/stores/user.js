import {observable, action} from 'mobx';


export class UserStore {

    @observable objects = [];
    @observable isLoading = true;

    constructor(transport) {
        this.transport = transport;
    }

    searchUsers(input) {
        return this.transport.get('/users/' + input)
            .then((res) => res.json())
            .then(action('UserStore.searchUsers', (json) => {
                return { options: json.data };
            }));
    }

}
