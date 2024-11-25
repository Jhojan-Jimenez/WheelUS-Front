import React from "react";
import useOpen from "@/hooks/useOpen";

const UserDropdown: React.FC = () => {
  const { isOpen, toggle: toggleDropdown, ref } = useOpen();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex mx-3 text-sm  rounded-full md:mr-0 "
        id="user-menu-button"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="user photo"
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 z-100 mt-2 w-56 bg-white rounded divide-y divide-gray-100 shadow "
          ref={ref}
        >
          <div className="py-3 px-4">
            <span className="block text-sm font-semibold text-gray-900 ">
              Neil sims
            </span>
            <span className="block text-sm text-gray-500 truncate ">
              name@flowbite.com
            </span>
          </div>
          <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm 
"
              >
                My profile
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 text-sm h">
                Account settings
              </a>
            </li>
          </ul>
          <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
            <li>
              <a href="#" className="block py-2 px-4 text-sm ">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
