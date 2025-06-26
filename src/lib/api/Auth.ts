import { api } from './Config';
import { userLogData, userRegData } from '../types';

export async function authSignin({ email, password }: userLogData) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  const res = await api.post('/auth/login', body, config);
  return res.data;
}

export async function authSignup(data: userRegData) {
  const formData = new FormData();
  if (data.photo && data.photo.length > 0) {
    formData.append('profilePhoto', data.photo[0]);
  }

  (Object.keys(data) as (keyof userRegData)[]).forEach((key) => {
    if (key !== 'photo' && data[key] !== undefined) {
      formData.append(key, data[key] as string);
    }
  });
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await api.post('/auth/register', formData, config);
  return res.data;
}
export async function getUserByToken(token: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('[DEBUG] setLocalStorageUser llamado');
  console.trace();
  const res = await api.get('/user/', config);
  return res.data.user;
}
export async function authRefreshToken(token: string) {
  const res = await api.post('/auth/refresh-token', { refreshToken: token });
  return res.data.authToken;
}
