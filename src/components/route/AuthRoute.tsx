import { useAuth } from '@/hooks/useAuth';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      if (window.location.pathname !== '/') {
        Swal.fire({
          title: 'Error!',
          text: 'Debes iniciar sesión primero',
          icon: 'error',
        });
      }
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
