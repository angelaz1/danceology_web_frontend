import axios from 'axios';

const httpInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PATH,
  headers: {
    'Content-type': 'application/json',
  },
});

httpInstance.interceptors.request.use(
    (req) => {
      return req;
    },
    (err) => {
      return Promise.reject(err);
    },
);

httpInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      return Promise.reject(err);
    },
);

export default httpInstance;
