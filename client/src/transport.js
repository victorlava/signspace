

export class Transport {

    constructor(base_url) {
        this.base_url = base_url;
    }

    get(url, data={}) {

        let search = Object.entries(data).map(([k, v]) => `${k}=${v}`).join('&');

        if (search) {
            search = '?' + search;
        }

        return fetch(this.base_url + url + search, {
            credentials: 'include',
        });
    }

    post(url, data) {
        return fetch(this.base_url + url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
    }

}
