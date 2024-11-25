import React from "react";
import useOpen from "@/hooks/useOpen";

const AppsDropdown: React.FC = () => {
  const { isOpen, toggle: toggleDropdown, ref } = useOpen();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="p-2 text-gray-500 rounded-lg "
      >
        <span className="sr-only">View notifications</span>
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-60  rounded divide-y divide-gray-100 shadow z-100"
          ref={ref}
        >
          <div className="block py-2 px-4 font-medium text-center text-gray-700 bg-gray-100 ">
            Apps
          </div>
          <div className="grid grid-cols-3 gap-4 p-4 bg-white">
            <AppItem />
            <AppItem />
            <AppItem />
            <AppItem />
          </div>
        </div>
      )}
    </div>
  );
};

const AppItem: React.FC = () => {
  return (
    <a
      href="#"
      className="block p-4 text-center rounded-lg hover:bg-slate-50  group"
    >
      <svg
        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 20"
      >
        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
      </svg>
      <div className="text-sm font-medium text-gray-900 ">Sales</div>
    </a>
  );
};
export default AppsDropdown;
