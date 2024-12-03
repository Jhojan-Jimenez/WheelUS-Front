import { useAuth } from '@/hooks/useAuth';
import { getUserById } from '@/lib/api/user';
import { ChatSchema, MessageSchema, UserSchema } from '@/lib/types';
import { formatFirestoreTimestamp } from '@/lib/utils';
import React, { useState, useRef, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

interface ChatWindowProps {
  chat: ChatSchema | undefined;
  messages: MessageSchema[];
  loading: boolean;
  onBackClick: () => void;
  sendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  chat,
  messages,
  loading,
  onBackClick,
  sendMessage,
}) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [contactUser, setContactUser] = useState<UserSchema | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const fetchContactData = async () => {
      const contactId = chat?.users.filter((userId) => userId !== user?.id)[0];
      if (!contactId) return;
      const res = await getUserById(contactId);
      setContactUser(res);
    };
    fetchContactData();
  }, [chat, user?.id]);

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (loading) {
    return (
      <div className="loading-layout">
        <BeatLoader color="#028747" />
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col overflow-y-hidden max-h-[85vh]">
      <div className="bg-emerald-500 text-white p-4 flex items-center">
        <button onClick={onBackClick} className="md:hidden mr-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <img
          src={contactUser?.photo || '/placeholder.svg?height=40&width=40'}
          alt={contactUser?.name || 'Imagen User'}
          className="w-10 h-10 rounded-full mr-3"
        />
        <h2 className="text-xl font-semibold">
          {(contactUser?.name || '') + ' ' + (contactUser?.lastname || '')}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.senderId === user?.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 text-right">
                {formatFirestoreTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="bg-emerald-500 text-white rounded-full p-2 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
