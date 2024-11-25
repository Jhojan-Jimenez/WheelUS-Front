import React from "react";
import useOpen from "@/hooks/useOpen";

const NotificationDropdown: React.FC = () => {
  const { isOpen, toggle: toggleDropdown, ref } = useOpen();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="p-2 mr-1 text-gray-500 rounded-lg "
      >
        <span className="sr-only">View notifications</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 rounded divide-y divide-gray-100 shadow z-100"
          ref={ref}
        >
          <div className="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-100 ">
            Notifications
          </div>
          <div className="bg-white">
            <Notification />
            <Notification />
          </div>
        </div>
      )}
    </div>
  );
};

const Notification: React.FC = () => {
  return (
    <div className="hover:bg-slate-50">
      <a href="#" className="flex py-3 px-4 border-b ">
        <div className="flex-shrink-0">
          <img
            className="w-11 h-11 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
            alt="Bonnie Green avatar"
          />
          <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 ">
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
            New message from{" "}
            <span className="font-semibold text-gray-900 ">Bonnie Green</span>:
            "Hey, what's up? All set for the presentation?"
          </div>

          <div className="text-xs font-medium text-primary-700 ">
            a few moments ago
          </div>
        </div>
        <button
          onClick={() => alert("Cerrar notificación")} // Aquí puedes agregar la lógica para cerrar
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
