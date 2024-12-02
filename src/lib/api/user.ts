import { userModifyData, UserSchema } from '../types';
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

export async function modifyUser(newData: userModifyData, userId: string) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const { name, lastname, contact, photo } = newData;
  const formData = new FormData();
  if (name) formData.append('name', name);
  if (lastname) formData.append('lastname', lastname);
  if (contact) formData.append('contact', contact);
  if (photo && photo.length > 0) {
    formData.append('profilePhoto', photo[0]);
  }
  const res = await api.patch(`user/${userId}`, formData, config);
  if (res.status === 200) {
    const newDataUser: UserSchema = await getUserByToken();
    return newDataUser;
  }
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
  if (res.notifications) {
    return res.notifications;
  }

  return [];
}
export async function deleteUserNotification(notificationIndex: number) {
  setAuthHeader();
  await api.delete(`/user/${String(notificationIndex)}/notifications`);
}
export async function deleteUserNotifications() {
  setAuthHeader();
  await api.delete('/user/notifications');
}
