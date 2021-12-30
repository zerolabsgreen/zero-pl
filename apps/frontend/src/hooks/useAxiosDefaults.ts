import axios from 'axios';

declare global {
  interface Window {
    config: {
      API_BASE_URL: string;
    };
  }
}

export const useAxiosDefaults = () => {
  axios.defaults.baseURL = window.config.API_BASE_URL;
};
