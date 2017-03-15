import axios from 'axios';

export const hasKeyGuard = (nextState, replace) => {
    const api_key = localStorage.getItem('api_key');
    const company = localStorage.getItem('company');

    if (!api_key || !company) {
        // If they don't have their key stored locally, force them to add one by redirecting them.
        replace(`/login`);
    } else {
        // If their key is already stored locally, set the Basic Auth username to it
        // and set the baseURL to their company
        axios.defaults.baseURL = `http://${ company }.teamwork.com`;
        axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(`${ api_key }:anything`);
    }
}
