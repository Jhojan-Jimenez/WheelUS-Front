import React from 'react';
import { useOpen } from '@/hooks/useOpen';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, toggle: toggleDropdown, ref } = useOpen();
  const { user, signout } = useAuth();
  return (
    <>
      {user ? (
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
              src={user.photo}
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
                  {user.name + ' ' + user.lastname}
                </span>
                <span className="block text-sm text-gray-500 truncate ">
                  {user.email}
                </span>
              </div>
              <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
                <li>
                  <button
                    className="block py-2 px-4 text-sm green-text w-full"
                    onClick={() => navigate('/profile')}
                  >
                    My profile
                  </button>
                </li>
              </ul>
              {user.vehicle_plate && (
                <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
                  <li>
                    <button
                      className="block py-2 px-4 text-sm green-text w-full"
                      onClick={() => navigate('/myVehicle')}
                    >
                      My vehicle
                    </button>
                  </li>
                </ul>
              )}
              <ul className="py-1 text-gray-500 " aria-labelledby="dropdown">
                <li>
                  <button
                    className="block py-2 px-4 text-sm w-full "
                    onClick={() => {
                      signout();
                    }}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>Login</div>
        </div>
      )}
    </>
  );
};

export default UserDropdown;
