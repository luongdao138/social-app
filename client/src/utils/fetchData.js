import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

export const getDataAPI = (url, token, params = {}) => {
  return axiosClient.get(url, { params, headers: { Authorization: token } });
};

export const postDataAPI = (url, data, token) => {
  return axiosClient.post(url, data, { headers: { Authorization: token } });
};

export const putDataAPI = (url, data, token) => {
  return axiosClient.put(url, data, { headers: { Authorization: token } });
};

export const patchDataAPI = (url, data, token) => {
  return axiosClient.put(url, data, { headers: { Authorization: token } });
};

export const deleteDataAPI = (url, token) => {
  return axiosClient.put(url, { headers: { Authorization: token } });
};
