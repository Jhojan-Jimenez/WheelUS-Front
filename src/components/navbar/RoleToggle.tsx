import { useRole } from '@/hooks/useRol';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleToggle: React.FC = () => {
  const { currentRole, setCurrentRole } = useRole();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isDriver = currentRole === 'driver';

  const toggleRole = () => {
    setCurrentRole(isDriver ? 'passenger' : 'driver');
  };

  if (!user?.vehicle_plate) {
    return (
      <div className="flex items-center justify-center p-4">
        <button
          onClick={() => navigate('/car-register')}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Añadir carro
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-4 flex items-center justify-between gap-2">
        <span
          className={`text-sm font-medium ${isDriver ? 'text-gray-400' : 'text-emerald-600'}`}
        >
          Pasajero
        </span>
        <button
          onClick={toggleRole}
          className={`relative inline-flex items-center h-8 rounded-full w-16 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
            isDriver ? 'bg-emerald-500' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={isDriver}
        >
          <span className="sr-only">Toggle role</span>
          <span
            className={`inline-block w-6 h-6 transform transition-transform duration-300 ease-in-out bg-white rounded-full shadow-md ${
              isDriver ? 'translate-x-9' : 'translate-x-1'
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium ${isDriver ? 'text-emerald-600' : 'text-gray-400'}`}
        >
          Conductor
        </span>
      </div>
    </div>
  );
};

export default RoleToggle;
