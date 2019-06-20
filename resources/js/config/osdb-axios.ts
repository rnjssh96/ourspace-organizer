import axios from 'axios';

/**
 * Axios default config
 */
const OSDBAxios = axios.create({
    baseURL: 'http://dbserver.ourspace.dev',
    headers: { Authorization: '5401aa1394c126b762f691cf0f2d0cf6' },
    timeout: 1000,
});

export default OSDBAxios;
