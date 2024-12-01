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
export async function getUserByToken() {
  setAuthHeader();
  const res = await api.get('/user/');
  return res.data.user;
}
export async function getUserRides(id: string) {
  setAuthHeader();
  const res = await api.get(`/user/${id}/rides`);
  return res.data.userRides;
}

export async function addBookingRide(
  userId: string,
  rideId: string,
  arrivalPoints: string[]
) {
  setAuthHeader();
  const res = await api.post(`/user/${userId}/rides`, {
    rideId,
    arrivalPoints,
  });
  return res;
}
export async function deleteBookingRide(
  userId: string,
  rideId: string,
  point: string
) {
  const res = await api.delete(`/user/${userId}/rides`, {
    params: { rideId, point },
  });
  return res;
}
export async function userNotifications() {
  const res = await getUserByToken();
  return res.notifications;
}
export async function deleteUserNotification(notificationIndex: number) {
  setAuthHeader();
  await api.delete(`/user/${String(notificationIndex)}/notifications`);
}
