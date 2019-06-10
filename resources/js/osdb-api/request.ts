import axios, { AxiosRequestConfig } from 'axios';

/**
 * Axios default config
 */
axios.defaults.baseURL = 'https://dbserver.ourspace.dev';
axios.defaults.headers.common['Authorization'] =
    '5401aa1394c126b762f691cf0f2d0cf6';

/**
 * GET data from the server
 */
export const getFromServer = async (
    axiosConfig: AxiosRequestConfig,
): Promise<any> => {
    return new Promise((resolve, reject) => {
        const axiosCombinedConfig = {
            ...axiosConfig,
            method: 'get',
        };
        axios(axiosCombinedConfig)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject('OS DEBUG :: DB server response is not 200');
                }
            })
            .catch(error => {
                if (error.request) {
                    reject('OS DEBUG :: DB gave no response back');
                }
            });
    });
};

/**
 * POST data to the server
 */
export const postToServer = async (
    axiosConfig: AxiosRequestConfig,
    data: any,
): Promise<any> => {
    return new Promise((resolve, reject) => {
        const axiosCombinedConfig = {
            ...axiosConfig,
            method: 'post',
            data: data,
        };
        axios(axiosCombinedConfig)
            .then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    reject('OS DEBUG :: DB server response is not 200');
                }
            })
            .catch(error => {
                if (error.request) {
                    reject('OS DEBUG :: DB gave no response back');
                }
            });
    });
};
