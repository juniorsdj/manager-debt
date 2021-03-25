import React from 'react';
import axios from 'axios';


export const handleResponseSuccess = async function (response) {

    return response.data;
};
export const handleResponseError = async (error) => {

    if (error.response) {
        const {
            response: { status, data },
        } = error;
        switch (status) {
            case 400:
                const { errors } = data;
                const msg = (
                    <div>
                        <strong>[ERR400]:</strong>
                        <div>
                            {errors
                                .map((error) => error.messages.join(' - '))
                                .map((error, i) => (
                                    <div key={i}>{error}</div>
                                ))}
                        </div>
                    </div>
                );
                console.log(msg)
                break;
            case 401:
                //TODO implementar regra de segurança para 401 nos requests
                break;
            case 403:
                //TODO implementar regra de segurança para 403 nos requests
                break;
            default:

        }
    } else {
        if (error.message === 'Network Error') {
            // TODO implementar o que será feito em casos de network error
        }
    }

    return Promise.reject(error);
};

const AxiosApi = axios;
AxiosApi.defaults.baseURL = "https://backend-manager-debt.herokuapp.com";
AxiosApi.interceptors.response.use(handleResponseSuccess, handleResponseError);

export const setBearerToken = (token) => {
    AxiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default AxiosApi;
