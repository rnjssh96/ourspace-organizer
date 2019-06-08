import axios, { AxiosRequestConfig } from 'axios';

/**
 * Axios default config
 */
const axiosDefaultConfig: AxiosRequestConfig = {
    // url: `/ospace/${spaceID}`,
    baseURL: 'https://dbserver.ourspace.dev',
    headers: { Authorization: '5401aa1394c126b762f691cf0f2d0cf6' },
};

/**
 * GET data from the server
 */
export const getFromServer = async (
    axiosConfig: AxiosRequestConfig,
): Promise<any> => {
    const axiosCombinedConfig = {
        ...axiosDefaultConfig,
        ...axiosConfig,
        method: 'get',
    };

    return new Promise((resolve, reject) => {
        axios(axiosCombinedConfig)
            .then(result => {
                if (result.status === 200) {
                    resolve(result.data);
                }
            })
            .catch(error => {
                reject(error);
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
    const axiosCombinedConfig = {
        ...axiosDefaultConfig,
        ...axiosConfig,
        method: 'post',
        data: data,
    };

    return new Promise((resolve, reject) => {
        axios(axiosCombinedConfig)
            .then(result => {
                if (result.status === 200) {
                    resolve(result.data);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};
