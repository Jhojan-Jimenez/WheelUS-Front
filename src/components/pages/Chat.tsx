import React, { useEffect, useState } from 'react';
import ContactList from '../chat/ContactList';
import ChatWindow from '../chat/ChatWindow';
import socket from '@/lib/api/Config';
import { ChatSchema, MessageSchema } from '@/lib/types';
import { getChatMessages, getUserChats } from '@/lib/api/chat';
import { useAuth } from '@/hooks/useAuth';

const Chat: React.FC = () => {
  const [chats, setChats] = useState<ChatSchema[]>([]);
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<ChatSchema>();
  const [messages, setMessages] = useState<MessageSchema[] | []>([]);
  const [isMobileContactListVisible, setIsMobileContactListVisible] =
    useState(true);

  const handleChatSelect = (chat: ChatSchema) => {
    setSelectedChat(chat);
    setIsMobileContactListVisible(false);
  };
  useEffect(() => {
    const fetchChatData = async () => {
      const res = await getUserChats();
      setChats(res);
      if (selectedChat?.chatId && user) {
        const otherUserId = selectedChat.users.filter(
          (userId) => userId !== user.id
        )[0];
        const res = await getChatMessages(otherUserId);
        setMessages(res);
      }
    };
    fetchChatData();
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
      console.log('Mensaje recibido:', message);
    });

    return () => {
      socket.off('message');
    };
  }, [selectedChat, user]);

  const sendMessage = (message: string) => {
    socket.emit('privateMessage', { toUserId: 111111, message });
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
        />
      </div>
      {!selectedChat ? (
        <div className="h-full flex items-center justify-center flex-1 bg-gray-50">
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
            onBackClick={() => setIsMobileContactListVisible(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
