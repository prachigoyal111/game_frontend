import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080',
});

client.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default client;
