import axios, { AxiosRequestHeaders } from 'axios';

const instance = axios.create({
  baseURL: 'http://121.199.160.202:9081/api',
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 0) {
      return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
