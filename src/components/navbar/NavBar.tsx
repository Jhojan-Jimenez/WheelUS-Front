import AppsDropdown from '@/components/navbar/AppsDropdown';
import Logo from '@/components/navbar/Logo';
import NotificationDropdown from '@/components/navbar/NotificationDropdown';
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
            <Logo />
          </div>
          {location.pathname !== '/' && location.pathname !== '/register' && (
            <RoleToggle />
          )}
          <div className="flex items-center lg:order-2">
            {user && (
              <>
                {location.pathname !== '/chat' && (
                  <Link href={'/chat'}>
                    <ChatIcon />
                  </Link>
                )}
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
