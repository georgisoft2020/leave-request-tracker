import axios from 'axios';

const SERVER_IP = 'http://localhost';
const SERVER_PORT = '8090';

export const API_URL = `${SERVER_IP}:${SERVER_PORT}/`;

export const RETRY_CONNECTION_TIMEOUT = 1000000;

class BaseAPI {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.api = axios.create({
            baseURL: API_URL,
            timeout: RETRY_CONNECTION_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        this.setInterceptors();
    }

    setInterceptors() {
        this.api.interceptors.request.use(req => {
            const jwt = localStorage.getItem('token');
            if (jwt)
                req.headers['Authorization'] = `Bearer ${jwt}`;

            return req;
        });

        //TODO: Make interceptors.reponse
        // this.api.interceptors.response.use(
        //     (response) => {
        //         return response;
        //     }, err => {
        //         return new Promise((resolve, reject) => {
        //             if(err.response.status === 403 || err.response.status === 401) {
        //                 localStorage.removeItem('token');
        //
        //                 resolve(err.response);
        //             }
        //             else {
        //                 console.log('reject error')
        //                 reject(err);
        //             }
        //         })
        //     });
    }

    get = (url, options) => this.api.get(url, options);

    post = (url, data, options) => this.api.post(url, data, options);
}

export default BaseAPI;

