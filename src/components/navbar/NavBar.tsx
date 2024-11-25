import useOpen from '@/hooks/useOpen';
import AppsDropdown from '@/components/navbar/AppsDropdown';
import Logo from '@/components/navbar/Logo';
import NotificationDropdown from '@/components/navbar/NotificationDropdown';
import SearchBar from '@/components/navbar/SearchBar';
import UserDropdown from '@/components/navbar/UserDropdown';

export default function NavBar() {
  const { isOpen: isSidebarOpen, toggle: toggleSidebar } = useOpen();
  return (
    <header className="antialiased sticky w-screen top-0 flex justify-center border-b-2 z-100 bg-white">
      <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 w-full max-w-[1240px]">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              id="toggleSidebar"
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar"
              onClick={toggleSidebar}
              className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline "
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h14M1 6h14M1 11h7"
                />
              </svg>
            </button>
            <button
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar"
              onClick={toggleSidebar}
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden "
            >
              <svg
                className="w-[18px] h-[18px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <Logo />
            <SearchBar />
          </div>
          <div className="flex items-center lg:order-2">
            <button
              type="button"
              className="hidden sm:inline-flex items-center justify-center text-gray-500 bg-primary-700  font-medium rounded-lg text-xs px-3 py-1.5 mr-2 "
            >
              <svg
                aria-hidden="true"
                className="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Widget
            </button>
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
            <NotificationDropdown />
            <AppsDropdown />
            <UserDropdown />
          </div>
        </div>
      </nav>
    </header>
  );
}
