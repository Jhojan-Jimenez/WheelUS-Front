import { api, setAuthHeader } from './Config';

export async function getNotifications() {
  setAuthHeader();
  const res = await api.get('/user/notifications');
  return res.data.notifications;
}

export async function getUserById(id: string) {
  setAuthHeader();
  const res = await api.get(`/user/${id}`);
  return res.data.user;
}
