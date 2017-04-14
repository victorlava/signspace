import request from 'superagent';
import uuid from 'js-uuid';
import {API_BASE_URL} from 'constants.js';


class API {
    base = API_BASE_URL;

    post(url, data) {
        return request
            .post(this.base + url)
            .withCredentials()
            .type('json')
            .send(data);
    }

    get(url, data) {
        return request
            .get(this.base + url)
            .withCredentials()
            .query(data);
    }
}


export const api = new API();


export const newID = () => {
    return uuid.v4();
};
