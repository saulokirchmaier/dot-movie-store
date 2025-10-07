import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

if (!API_KEY) {
  console.error('TMDb API Key is not defined. Please check your .env file.');
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
