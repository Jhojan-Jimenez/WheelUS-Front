import { userNotifications } from '@/lib/api/chat';
import socket from '@/lib/api/Config';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const BellIcon: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const res = await userNotifications();
      setNotificationCount(res.length);
    };
    fetchData();
    socket.on('appNotification', (mes) => {
      toast.info(mes);

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
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
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

export default BellIcon;
