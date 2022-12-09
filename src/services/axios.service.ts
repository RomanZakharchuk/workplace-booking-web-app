import axios, { AxiosResponse } from "axios";

import {baseURL} from "../constants";

export type AxiosRes<T> = Promise<AxiosResponse<T>>

export const axiosService = axios.create({ baseURL });

axiosService.interceptors.request.use(async (config) => {
    const configRequest = config;
    const token = localStorage.getItem('token');

    if (configRequest && configRequest.headers) {
        configRequest.headers["Authorization"] = `bearer ${token}`;
    }
    return configRequest;
});