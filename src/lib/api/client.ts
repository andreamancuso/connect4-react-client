import axios, {AxiosResponse, AxiosError} from 'axios';
import {IAPIClientConf} from "../../types";

class APIClient {
    private endpointsBaseUrl: string;
    private conf: IAPIClientConf;

    constructor(endpointsBaseUrl: string, conf: IAPIClientConf) {
        this.endpointsBaseUrl = `${endpointsBaseUrl}${conf.endpoints.base}`;
        this.conf = conf;
    }

    get<T>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const {timeout} = this.conf;

            axios.get<T>(`${this.endpointsBaseUrl}${path}`, {timeout})
            .then((response: AxiosResponse<T>) => resolve(response.data))
            .catch(this.handleError(reject));
        });
    }

    post<T>(path: string, body?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            const {timeout} = this.conf;

            axios.post(`${this.endpointsBaseUrl}${path}`, body, {timeout})
            .then((response: AxiosResponse<T>) => resolve(response.data))
            .catch(this.handleError(reject));
        });
    }

    put(path: string, body?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const {timeout} = this.conf;

            axios.put(`${this.endpointsBaseUrl}${path}`, body, {timeout})
            .then((response: AxiosResponse) => resolve())
            .catch(this.handleError(reject));
        });
    }

    delete(path: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const {timeout} = this.conf;

            axios.delete(`${this.endpointsBaseUrl}${path}`, {timeout})
            .then((response: AxiosResponse) => resolve())
            .catch(this.handleError(reject));
        });
    }

    handleError(reject: Function) {
        return function (error: AxiosError) {
            if (error.response) {
                reject(error.response.data);
            } else {
                // Something happened in setting up the request that triggered an Error
                reject(`Error: ${error.message}`);
            }
        };
    }
}

export default APIClient;
