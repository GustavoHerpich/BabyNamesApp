import axios, { AxiosInstance } from "axios";

const _babyNames: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BABYNAMES_URI,
  withCredentials: true,
});

_babyNames.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export { _babyNames };
