import axios from 'axios';

/**
 * Axios default config
 */
axios.defaults.baseURL = 'https://dbserver.ourspace.dev';
axios.defaults.headers.common['Authorization'] =
    '5401aa1394c126b762f691cf0f2d0cf6';
axios.defaults.timeout = 1000;

export default axios;
