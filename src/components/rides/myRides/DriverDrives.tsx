import { useAuth } from '@/hooks/useAuth';
import { getVehicleRides } from '@/lib/api/vehicle';
import { RideSchema } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import DriverRideCard from './DriverRideCard';
import Link from '@/components/ui/Link';

const DriverRides: React.FC = () => {
  const { user } = useAuth();
  const [driverRides, setDriverRides] = useState<RideSchema[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (user?.vehicle_plate) {
        const res = await getVehicleRides(user.vehicle_plate);
        setDriverRides(res);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto px-4 py-8 h-full">
      <div className="flex justify-between py-6 items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Created Rides</h2>
        <Link href="/myRides/create" className="h-full flex items-center">
          <p className="hidden green text-white p-2 rounded-md md:block">
            Crear un viaje
          </p>
          <div className="md:hidden green text-white p-1 rounded-md">
            <svg
              className="w-6 h-6 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </Link>
      </div>

      {loading ? (
        <div className="loading-layout">
          <MoonLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {driverRides && driverRides.length > 0 ? (
            driverRides.map((ride, index) => (
              <DriverRideCard
                key={index}
                ride={ride}
                setDriverRides={setDriverRides}
              />
            ))
          ) : (
            <div>Crea un viaje para que aparezca aquí</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverRides;
