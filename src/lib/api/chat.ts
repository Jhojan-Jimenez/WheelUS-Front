import { api, setAuthHeader } from './Config';

export async function getUserChats() {
  setAuthHeader();
  const res = await api.get('/chat/user');
  return res.data.chats;
}

export async function getChatMessages(contactId: string) {
  console.log(contactId);

  setAuthHeader();
  const res = await api.get(`/chat/messages/${contactId}`);
  return res.data.messages;
}
export async function postMessage(contactId: string, message: string) {
  setAuthHeader();
  const res = await api.post(`/chat/messages/${contactId}`, { message });
  return res.data.message;
}
