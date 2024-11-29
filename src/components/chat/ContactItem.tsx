import { useAuth } from '@/hooks/useAuth';
import useLoad from '@/hooks/useLoad';
import { readChat } from '@/lib/api/chat';
import socket from '@/lib/api/Config';
import { getUserById } from '@/lib/api/user';
import { ChatSchema, MessageSchema, UserSchema } from '@/lib/types';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

export default function ContactItem({
  chat,
  selectedChatId,
  onSelectChat,
}: {
  chat: ChatSchema;
  selectedChatId: string | undefined;
  onSelectChat: (chat: ChatSchema) => void;
}) {
  const { user } = useAuth();
  const count = chat.unreadCounts[user?.id || ''] || 0;
  const [unreadCount, setUnreadCount] = useState(count);
  const [contactUser, setContactUser] = useState<UserSchema | null>(null);
  const { loading, execute: fetchContact } = useLoad(getUserById);
  const [lastMessage, setLastMessage] = useState(chat.lastMessage);
  const otherUserId = (chat: ChatSchema) => {
    return chat.users.filter((userId) => user && userId !== user.id)[0];
  };
  useEffect(() => {
    const fetchContactData = async () => {
      const res = await fetchContact(otherUserId(chat));
      setContactUser(res);
    };
    fetchContactData();
    socket.on('privateMessage', async (message: MessageSchema) => {
      if (String(message.chatId) === String(chat.chatId)) {
        setUnreadCount((prev: number) => prev + 1);
        setLastMessage(message.content);
      }
      if (String(message.chatId) === String(selectedChatId)) {
        setUnreadCount(0);
        await readChat(chat.chatId);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li
      key={chat.chatId}
      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
        chat.chatId === selectedChatId ? 'bg-emerald-50' : ''
      }`}
      onClick={async () => {
        onSelectChat(chat);
        await readChat(chat.chatId);
        setUnreadCount(0);
      }}
    >
      <div className="flex items-center w-full justify-between">
        {loading ? (
          <>
            <div className="loading-layout">
              <BeatLoader color="#028747" />
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <img
              src={contactUser?.photo}
              alt={contactUser?.name || 'Imagen User'}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold">{contactUser?.name}</h3>
              <p className="text-sm text-gray-600">{lastMessage}</p>
            </div>
          </div>
        )}

        {unreadCount > 0 && (
          <div className="w-10 h-10 bg-green-300 rounded-full flex justify-center items-center">
            {unreadCount}
          </div>
        )}
      </div>
    </li>
  );
}
