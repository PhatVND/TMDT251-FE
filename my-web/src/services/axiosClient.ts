import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080', // Thay link này bằng link thật của backend bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// (Tùy chọn) Cấu hình Interceptor để tự động đính kèm Token khi đăng nhập sau này
axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;