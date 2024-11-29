import { api, setAuthHeader } from './Config';
import { getUserByToken } from './user';

export async function getUserChats() {
  setAuthHeader();
  const res = await api.get('/chat/user');
  return res.data.chats;
}
export async function getChatById(chatId: string) {
  setAuthHeader();
  const res = await api.get(`/chat/get/${chatId}`);
  return res.data.chat;
}

export async function createNewChat(contactId: string) {
  setAuthHeader();
  const res = await api.post('/chat/create', { contactId });
  return res.data.chat;
}
export async function getChatMessages(chatId: string) {
  setAuthHeader();
  const res = await api.get(`/chat/messages/${chatId}`);
  return res.data.messages;
}
export async function postMessage(contactId: string, message: string) {
  setAuthHeader();
  const res = await api.post(`/chat/messages/${contactId}`, { message });
  return res.data.message;
}
export async function readChat(chatId: string) {
  setAuthHeader();
  await api.patch('/chat/read', { chatId });
}
export async function unreadChatNotifications() {
  setAuthHeader();
  const res = await api.get('/chat/user-notifications');
  return res.data.chats;
}

export async function userNotifications() {
  const res = await getUserByToken();

  return res.notifications;
}
