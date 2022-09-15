import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.patch(`${API_URL}/session`, null, {
          withCredentials: true,
        });
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return $api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  },
);

export default $api;
export { API_URL };
