import { useAuth } from '@/hooks/useAuth';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const VehicleRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.vehicle_plate) {
      navigate('/rides');
      Swal.fire({
        title: 'Error!',
        text: 'Debes tener un vehiculo registrado',
        icon: 'error',
      });
    }
  }, [user]);

  return children;
};

export default VehicleRoute;
