import axios from 'axios';

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
  window.localStorage.setItem('auth_token', token);
};

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { 'Authorization': `Bearer ${getAuthToken()}` }
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  })
};

export const requestParam = (method, url, data) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { 'Authorization': `Bearer ${getAuthToken()}` }
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    params: data,
  })
};

export const requestBodyParam = (method, url, data, params) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { 'Authorization': `Bearer ${getAuthToken()}` }
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
    params: params,
  })
};

export const requestBodyMultipartFile = (method, url, data, params) => {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

  let headers = {
    'Content-Type': 'multipart/form-data'
  };
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  }

  return axios({
    method: method,
    url: url,
    data: data,
    params: params,
    headers: headers,
  })
};
