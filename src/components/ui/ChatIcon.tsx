import { unreadChatNotifications } from '@/lib/api/chat';
import socket from '@/lib/api/Config';
import React, { useEffect, useState } from 'react';

const ChatIcon: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await unreadChatNotifications();
      setNotificationCount(res);
    };
    fetchData();
    socket.on('notification', (mes) => {
      console.log(mes);

      setNotificationCount((prev) => prev + 1);
    });
  }, []);
  return (
    <div className="relative inline-block">
      <svg
        className="w-6 h-6 text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      {notificationCount > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
          {notificationCount > 99 ? '99+' : notificationCount}
        </span>
      )}
    </div>
  );
};

export default ChatIcon;
