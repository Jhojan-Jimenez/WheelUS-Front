import React, { useEffect, useState } from 'react';
import ContactList from '../chat/ContactList';
import ChatWindow from '../chat/ChatWindow';
import socket from '@/lib/api/Config';
import { ChatSchema, MessageSchema } from '@/lib/types';
import {
  getChatById,
  getChatMessages,
  getUserChats,
  postMessage,
} from '@/lib/api/chat';
import { useAuth } from '@/hooks/useAuth';

const Chat: React.FC = () => {
  const [chats, setChats] = useState<ChatSchema[]>([]);
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<ChatSchema>();
  const [messages, setMessages] = useState<MessageSchema[] | []>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingChats, setLoadingChats] = useState(false);
  const [isMobileContactListVisible, setIsMobileContactListVisible] =
    useState(true);

  const handleChatSelect = (chat: ChatSchema) => {
    setSelectedChat(chat);
    setIsMobileContactListVisible(false);
  };
  useEffect(() => {
    const fetchChatData = async () => {
      if (!selectedChat?.chatId) {
        setLoadingChats(true);
        const res = await getUserChats();
        setChats(res);
        setLoadingChats(false);
      }
      if (selectedChat?.chatId && user) {
        setLoadingMessages(true);

        const res = await getChatMessages(selectedChat.chatId);
        setMessages(res);
        setLoadingMessages(false);
      }
    };
    fetchChatData();
    socket.on('privateMessage', async (message: MessageSchema) => {
      const res = await getUserChats();
      if (
        !res.find((chat: ChatSchema) => chat.chatId === String(message.chatId))
      ) {
        const res = await getChatById(String(message.chatId));
        setChats((prevChats) => [...prevChats, res]);
      } else {
        setChats((prevChats) => {
          return prevChats;
        });
      }

      if (selectedChat?.chatId === String(message.chatId)) {
        setMessages((prev) => [...prev, message]);
      }

      console.log('Mensaje recibido:', message);
    });

    return () => {
      socket.off('message');
    };
  }, [selectedChat, user]);

  const sendMessage = async (message: string) => {
    if (!selectedChat || !user) return;

    const toUserId = selectedChat.users.find((userId) => userId !== user.id);
    if (!toUserId) return;

    const newMessage = await postMessage(toUserId, message);

    setMessages((prev) => [...prev, newMessage]);

    socket.emit('privateMessage', { toUserId, message: newMessage });
  };

  return (
    <div className="h-full w-full max-w-[1440px] bg-gray-100 flex border-2 border-gray-200 rounded-md">
      <div
        className={`${isMobileContactListVisible ? 'block' : 'hidden'} md:block md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 w-full min-w-64`}
      >
        <ContactList
          chats={chats}
          onSelectChat={handleChatSelect}
          selectedChatId={selectedChat?.chatId}
          loading={loadingChats}
          setChats={setChats}
        />
      </div>
      {!selectedChat ? (
        <div className="hidden h-full lg:flex items-center justify-center flex-1 bg-gray-50">
          Select a contact to start chatting
        </div>
      ) : (
        <div
          className={`${isMobileContactListVisible ? 'hidden' : 'block'} flex-1 bg-gray-50`}
        >
          <ChatWindow
            chat={selectedChat}
            messages={messages}
            sendMessage={sendMessage}
            loading={loadingMessages}
            onBackClick={() => setIsMobileContactListVisible(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
