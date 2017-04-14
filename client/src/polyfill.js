import 'whatwg-fetch';
import Promise from 'promise-polyfill'; 
import entries from 'object.entries';


if ( ! window.Promise) {
    window.Promise = Promise;
}

if ( ! Object.entries) {
    entries.shim();
}
