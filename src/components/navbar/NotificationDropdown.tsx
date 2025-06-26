import { useOpen } from '@/hooks/useOpen';
import { NotificationSchema } from '@/lib/types';
import BellIcon from '../ui/BellIcon';
import { useEffect, useState } from 'react';
import { formatDateFront } from '@/lib/utils';
import {
  deleteUserNotifications,
  deleteUserNotification,
  userNotifications,
} from '@/lib/api/user';
import { Trash2Icon } from 'lucide-react';

const NotificationDropdown: React.FC = () => {
  const { isOpen, toggle: toggleDropdown, ref } = useOpen();
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationSchema[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await userNotifications();
      setNotifications(res);
      setNotificationCount(res.length);
    };
    fetchData();
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="p-2 mr-1 text-gray-500 rounded-lg "
      >
        <BellIcon
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 rounded divide-y divide-gray-100 shadow z-100"
          ref={ref}
        >
          <div className="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-100 ">
            <div className="flex justify-between">
              Notifications
              <button onClick={async () => await deleteUserNotifications()}>
                <Trash2Icon />
              </button>
            </div>
          </div>
          <div className="bg-white max-h-[50vh] overflow-y-auto relative">
            {notificationCount > 0 ? (
              notifications.map((notification, index) => {
                return (
                  <Notification
                    key={index}
                    notification={notification}
                    index={index}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Notification = ({
  notification,
  index,
}: {
  notification: NotificationSchema;
  index: number;
}) => {
  return (
    <div className="hover:bg-slate-50 ">
      <a href="#" className="flex py-3 px-4 border-b ">
        <div className="flex-shrink-0">
          <img
            className="w-11 h-11 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
            alt="Bonnie Green avatar"
          />
          <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700">
            <svg
              className="w-2 h-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
              <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
            </svg>
          </div>
        </div>
        <div className="pl-3 w-full">
          <div className="text-gray-500 font-normal text-sm mb-1.5 ">
            <span className="font-semibold text-gray-900 ">
              {notification.content.split(' ').slice(0, 2).join(' ')}{' '}
            </span>
            {notification.content.split(' ').slice(2).join(' ')}
          </div>

          <div className="text-xs font-medium text-primary-700 ">
            {formatDateFront(notification.timestamp)}
          </div>
        </div>
        <button
          onClick={async () => await deleteUserNotification(index)}
          className="relative top-0 right-0 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </a>
    </div>
  );
};

export default NotificationDropdown;
