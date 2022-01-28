import axios from 'axios';

export const useAxiosDefaults = () => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
};
