import axios from 'axios';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
let socket: ReturnType<typeof io> | null = null;

export const getSocket = () => {
  if (!socket) {
    const token = Cookies.get('authToken');
    if (!token) {
      console.error('Auth token is undefined. Cannot initialize socket.');
      return null;
    }
    socket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
      auth: { authToken: token },
    });
  }
  return socket;
};

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

export const setAuthHeader = () => {
  const token = Cookies.get('authToken');
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];
  }
};
