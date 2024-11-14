import axios from 'axios';

const BASE_URL = 'https://d1kh1cvi0j04lg.cloudfront.net';

const defaultAxios = axios.create({
  baseURL: BASE_URL,
});

export default defaultAxios;
