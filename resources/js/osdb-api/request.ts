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
export const getFromServer = async (axiosConfig: AxiosRequestConfig) => {
    const axiosCombinedConfig = {
        ...axiosDefaultConfig,
        ...axiosConfig,
        method: 'get',
    };

    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });

    // axios(axiosCombinedConfig)
    //     .then(response => {
    //         // space = {
    //         //     id: spaceID,
    //         //     spaceNames: response.data['space_names'],
    //         //     types: [response.data['type']],
    //         //     locationText: response.data['location_text'],
    //         //     location: {
    //         //         lat: response.data['latitude'],
    //         //         lng: response.data['longitude'],
    //         //     },
    //         //     operatingHours: response.data['operating_hours'],
    //         //     amenityTags: response.data['amenity_tags'],
    //         //     spaceIntroduce: '',
    //         //     images: response.data['images'],
    //         //     rank: 0,
    //         //     busyLevel: '1',
    //         // };
    //     })
    //     .catch(error => {
    //         //
    //     });
};
