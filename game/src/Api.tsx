import axios, { AxiosInstance } from 'axios'
import { BASE_API_URL } from './constants';
import Utils from './Utils';

function isTokenSet(): boolean {
    return Utils.getToken() !== null;
}

export const Api: AxiosInstance = isTokenSet() 
    ?   axios.create({
            baseURL: BASE_API_URL,
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            },
        })
    :   axios.create({
            baseURL: BASE_API_URL,
        })
;