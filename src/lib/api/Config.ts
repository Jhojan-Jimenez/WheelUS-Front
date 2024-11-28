import axios from 'axios';
import Cookies from 'js-cookie';

import { io } from 'socket.io-client';
const token = Cookies.get('authToken');

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  auth: { authToken: token },
});

export default socket;

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

export const setAuthHeader = () => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];
  }
};
