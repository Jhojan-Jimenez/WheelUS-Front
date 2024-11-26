import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/rides" replace />;
  }

  return children;
};

export default PublicRoute;
