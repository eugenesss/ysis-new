import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('ysis_token');
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  return config;
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.message === 'Network Error') {
      // The user doesn't have internet
      return Promise.reject(error);
    }
    switch (error.response.status) {
      case 400:
        break;
      case 401:
        // not logged in
        break;
      case 403:
        // no access rights
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default api;
