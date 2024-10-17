// plugins/axios.ts
import axios, { AxiosInstance, RawAxiosRequestHeaders } from "axios";

const _defaultHeaders: Partial<RawAxiosRequestHeaders> = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token"),
};

const _babyNames: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BABYNAMES_URI,
  withCredentials: true,
  headers: _defaultHeaders,
});

export { _babyNames };
