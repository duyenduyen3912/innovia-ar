import Axios from 'axios';
import Cookies from 'js-cookie';
import config from "../config";
import { useRouter } from 'next/router';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: process.env.REACT_APP_API_DOMAIN,
});



export const sendGet = (url: string, params?: any, headers?: any) => {
  const config = {
    params,
    headers: headers || {}, 
  };

  return axiosInstance.get(url, config).then((res) => res.data)
};
export const sendPost = (url: string, params?: any, headers?: any) =>
  axiosInstance.post(url, params, { headers }).then((res) => res.data);

export const sendPut = (url: string, params?: any) => axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: any) => axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: any) => axiosInstance.delete(url, { params }).then((res) => res.data);
