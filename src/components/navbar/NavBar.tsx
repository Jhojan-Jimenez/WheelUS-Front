import AppsDropdown from '@/components/navbar/AppsDropdown';
import Logo from '@/components/navbar/Logo';
import NotificationDropdown from '@/components/navbar/NotificationDropdown';
import SearchBar from '@/components/navbar/SearchBar';
import UserDropdown from '@/components/navbar/UserDropdown';
import { useAuth } from '@/hooks/useAuth';
import RoleToggle from './RoleToggle';
import Link from '../ui/Link';
import ChatIcon from '../ui/ChatIcon';
import { useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const { user } = useAuth();
  return (
    <header className="antialiased sticky w-screen top-0 flex justify-center border-b-2 z-100 bg-white z-40">
      <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 w-full max-w-[1240px]">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            {location.pathname !== '/chat' && (
              <Link href={'/chat'}>
                <ChatIcon />
              </Link>
            )}
            <Logo />
            <SearchBar />
          </div>
          <div className="flex items-center lg:order-2">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="p-2 text-gray-500 rounded-lg lg:hidden"
            >
              <span className="sr-only">Search</span>
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
            {user && (
              <>
                <RoleToggle />
                <NotificationDropdown />
                <AppsDropdown />
                <UserDropdown />
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
