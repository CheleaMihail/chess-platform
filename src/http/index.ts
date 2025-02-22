import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const $api = axios.create({
  baseURL: apiUrl,
});

$api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('accessToken', accessToken);

  if (config.headers) config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        console.log(refreshToken);

        const response = await axios.post(`${apiUrl}auth/refresh/`, {
          refresh_token: refreshToken,
        });

        console.log('response.data.access_token', response.data.access_token);

        localStorage.setItem('accessToken', response.data.access_token);
        return $api.request(originalRequest);
      } catch (e) {}
    }
    throw error;
  }
);

export default $api;
