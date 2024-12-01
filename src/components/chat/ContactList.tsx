import { ChatSchema } from '@/lib/types';
import React, { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import Modal from '../modals/Modal';
import { userIdFormSchema } from '@/lib/formValidators';
import { getUserById } from '@/lib/api/user';
import { createNewChat } from '@/lib/api/chat';
import { isAxiosError } from 'axios';
import ContactItem from './ContactItem';

interface ContactListProps {
  chats: ChatSchema[];
  onSelectChat: (contact: ChatSchema) => void;
  selectedChatId: string | undefined;
  loading: boolean;
  setChats: (chats: ChatSchema[]) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  chats,
  onSelectChat,
  selectedChatId,
  setChats,
  loading,
}) => {
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const [newChatUserId, setNewChatUserId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = userIdFormSchema.safeParse({ userId: newChatUserId });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    try {
      await getUserById(newChatUserId);
      const res: ChatSchema = await createNewChat(newChatUserId);

      setChats([...chats, res]);
    } catch (error) {
      if (
        isAxiosError(error) &&
        error?.response?.data.message === 'Chat already exists'
      ) {
        setError('Un chat con este usuario ya existe');
        return;
      } else if (
        isAxiosError(error) &&
        error?.response?.data.message === 'You cannot chat with yourself'
      ) {
        setError('No puedes chatear contigo mismo');
        return;
      }
      setError('Usuario no encontrado');
    }
  };
  if (loading) {
    return (
      <div className="loading-layout">
        <MoonLoader color="#028747" />
      </div>
    );
  }
  return (
    <div className="h-full overflow-y-auto">
      {openSearchModal && (
        <Modal
          isOpen={openSearchModal}
          onClose={() => setOpenSearchModal(false)}
          height={'25%'}
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center h-full gap-4"
          >
            <label className="text-gray-700 text-lg font-medium">
              Iniciar chat
            </label>
            <input
              type="text"
              onChange={(e) => setNewChatUserId(e.target.value)}
              placeholder="Id del usuario"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-500 text-sm error-text">{error}</p>
            )}
            <button
              type="submit"
              className="px-4 py-2 green text-white rounded-md font-semibold"
            >
              Iniciar
            </button>
          </form>
        </Modal>
      )}
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-200">
          Chats
        </h2>
        <button
          className="my-2  text-gray-600 p-1 rounded-md"
          onClick={() => setOpenSearchModal(true)}
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
      <ul>
        {chats.map((chat) => {
          return (
            <ContactItem
              key={chat.chatId}
              chat={chat}
              selectedChatId={selectedChatId}
              onSelectChat={onSelectChat}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
