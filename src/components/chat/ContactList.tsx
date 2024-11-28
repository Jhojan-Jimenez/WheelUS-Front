import { useAuth } from '@/hooks/useAuth';
import { ChatSchema } from '@/lib/types';
import React from 'react';
import { MoonLoader } from 'react-spinners';

interface ContactListProps {
  chats: ChatSchema[];
  onSelectChat: (contact: ChatSchema) => void;
  selectedChatId: string | undefined;
}

const ContactList: React.FC<ContactListProps> = ({
  chats,
  onSelectChat,
  selectedChatId,
}) => {
  const { user } = useAuth();
  const otherUserId = chats.map((chat) => {
    return chat.users.filter((userId) => user && userId !== user.id)[0];
  });
  if (chats.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center h-full">
        <MoonLoader color="#028747" />
      </div>
    );
  }
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b border-gray-200">
        Chats
      </h2>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.chatId}
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
              chat.chatId === selectedChatId ? 'bg-emerald-50' : ''
            }`}
            onClick={() => onSelectChat(chat)}
          >
            <div className="flex items-center">
              <img
                src={'/placeholder.svg?height=40&width=40'}
                alt={otherUserId[0] || 'Imagen User'}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{otherUserId}</h3>
                <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
