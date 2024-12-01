import { useRole } from '@/hooks/useRol';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RoleRoute = ({ children }: { children: ReactNode }) => {
  const { currentRole } = useRole();
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (currentRole === 'driver') {
      setIsAllowed(true);
    } else {
      Swal.fire({
        title: 'Acceso Denegado',
        text: 'Debes tener el rol de conductor para acceder a esta página',
        icon: 'error',
      }).then(() => {
        navigate(-1);
      });
    }
  }, [currentRole, navigate]);

  if (!isAllowed) {
    return null;
  }

  return <>{children}</>;
};

export default RoleRoute;
