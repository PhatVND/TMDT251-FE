import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👇 API PUBLIC (KHÔNG GỬI TOKEN)
const PUBLIC_ENDPOINTS = [
  '/users/trainers',
  '/products',
];

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  // url có thể là full URL → normalize
  const requestUrl = config.url || '';

  const isPublic = PUBLIC_ENDPOINTS.some((endpoint) =>
    requestUrl.includes(endpoint)
  );

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // 🚫 QUAN TRỌNG: XÓA HẲN HEADER
    delete config.headers.Authorization;
  }

  return config;
});

export default axiosClient;
