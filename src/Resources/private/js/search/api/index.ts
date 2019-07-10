import axios, {AxiosPromise} from 'axios';
import {ApiProductResponse} from './types';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

/**
 *
 * @param query
 * @param from
 * @param size
 */
export const fetchProducts = (query: string, from: number = 0, size: number = 10): AxiosPromise<ApiProductResponse> => {
    return instance.get(`/products/search?channel=US_WEB&q=${query}&from=${from}&size=${size}`)
};
