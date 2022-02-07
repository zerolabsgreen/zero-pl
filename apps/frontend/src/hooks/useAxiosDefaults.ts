import axios, { AxiosRequestConfig } from 'axios';

declare global {
  interface Window {
    config: {
      API_BASE_URL: string;
      BLOCK_EXPLORER: string;
      UI_API_KEY: string
    };
  }
}

export const useAxiosDefaults = () => {
  axios.defaults.baseURL = window.config.API_BASE_URL;
  axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers) {
      config.headers['X-API-key'] = window.config.UI_API_KEY;
    }
    return config;
  });
};
