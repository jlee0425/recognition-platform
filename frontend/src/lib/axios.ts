import axios from 'axios';
import cookies from './cookie';

const client = axios.create();

client.defaults.baseURL = process.env.NEXT_PUBLIC_API_TARGET;

client.interceptors.request.use((req) => {
  const token = cookies.get('access_token');
  req.headers.Authorization = `Bearer ${token}`;

  return req;
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      cookies.remove('access_token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
)

export default client;