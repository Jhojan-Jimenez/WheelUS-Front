import { AuthContext } from '@/hooks/useAuth';
import {
  authRefreshToken,
  authSignin,
  authSignup,
  getUserByToken,
} from '@/lib/api/Auth';
import {
  userLogData,
  userRegData,
  UserSchema,
  VehicleSchema,
} from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import GeneralLoader from '@/components/modals/GeneralLoader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getVehicleByPlate } from '@/lib/api/vehicle';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const resActualUser = localStorage.getItem('user');
  const actualUser = resActualUser ? JSON.parse(resActualUser) : null;
  const resActualUserVehicle = sessionStorage.getItem('vehicle');
  const actualUserVehicle = resActualUserVehicle
    ? JSON.parse(resActualUserVehicle)
    : null;
  const navigate = useNavigate();
  const [user, _setUser] = useState(actualUser);
  const setUser = useCallback((newUser: typeof user) => {
    _setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  }, []);
  const [vehicle, setVehicle] = useState<VehicleSchema | null>(
    actualUserVehicle
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const token = Cookies.get('authToken');
        if (token) {
          await setLocalStorageUser(token, setUser, setVehicle);
        }
      } else {
        if (user.vehicle_plate !== undefined && !vehicle) {
          const carData = await getVehicleByPlate(user.vehicle_plate);
          sessionStorage.setItem('vehicle', JSON.stringify(carData));
          setVehicle(carData);
        }
      }
    };
    fetchUser();
  }, [user]);

  if (loading) {
    return <GeneralLoader message="Cargando información..." />;
  }

  const signup = async (data: userRegData) => {
    const { authToken, refreshToken } = await authSignup(data);
    Cookies.set('authToken', authToken, {
      path: '/',
      expires: 1,
      sameSite: 'Strict',
    });
    Cookies.set('refreshToken', refreshToken, {
      path: '/',
      expires: 7,
      sameSite: 'Strict',
    });
    await setLocalStorageUser(authToken, setUser, setVehicle);
  };

  const signin = async ({ email, password }: userLogData) => {
    const { authToken, refreshToken } = await authSignin({ email, password });
    Cookies.set('authToken', authToken, {
      path: '/',
      expires: 1,
      sameSite: 'Strict',
    });
    Cookies.set('refreshToken', refreshToken, {
      path: '/',
      expires: 7,
      sameSite: 'Strict',
    });
    await setLocalStorageUser(authToken, setUser, setVehicle);
  };

  const signout = () => {
    Swal.fire({
      title: '¿Seguro deseas cerrar sesión?',
      text: 'volverás al la página de inicio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9C0000',
      cancelButtonColor: '#028747',
      confirmButtonText: 'Si, cerrar sesión!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      setLoading(true);
      if (result.isConfirmed) {
        Cookies.remove('authToken');
        localStorage.removeItem('user');
        sessionStorage.removeItem('vehicle');
        navigate('/');
        setUser(null);
        setVehicle(null);
      }
      setLoading(false);
    });
  };
  const refreshUser = async () => {
    setLoading(true);
    const token = Cookies.get('refreshToken');
    if (token) {
      const authToken = await authRefreshToken(token);
      Cookies.set('authToken', authToken, {
        path: '/',
        expires: 1,
        sameSite: 'Strict',
      });
      await setLocalStorageUser(authToken, setUser, setVehicle);
      navigate('/rides');
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, vehicle, setUser, signup, signin, signout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const setLocalStorageUser = async (
  token: string,
  setUser: (user: UserSchema) => void,
  setVehicle: (vehicle: VehicleSchema | null) => void
) => {
  const res = await getUserByToken(token);
  setUser(res);

  if (res.vehicle_plate !== undefined) {
    const carData = await getVehicleByPlate(res.vehicle_plate);
    sessionStorage.setItem('vehicle', JSON.stringify(carData));
    setVehicle(carData);
  } else {
    setVehicle(null);
  }
};
