import axios, { AxiosRequestConfig } from 'axios';

export const useAxiosDefaults = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
      config.headers['X-API-key'] = process.env.NEXT_PUBLIC_UI_API_KEY;
    }
    return config;
  });
};
