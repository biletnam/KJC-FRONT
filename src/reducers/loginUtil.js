import axios from 'axios';
import { serverUrl } from "./urlUtil";

export const checkLogin = () => {
    const token = sessionStorage.getItem('kjc_token');
    return new Promise((resolve, reject) => {
            if(!token) {
                reject('noToken');
                return;
            }
            axios.get(serverUrl + '/api/login/check', {headers: {'x-access-token': token}})
                .then((result) => { resolve(result.data)})
                .catch((error) => {console.log('here noTokenError', error)});
        });
}