import { useAuth } from '@/hooks/useAuth';
import { getUserRides } from '@/lib/api/user';
import { RideSchema } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import PassengerRideCard from './PassengerRideCard';

const PassangerRides: React.FC = () => {
  const { user } = useAuth();
  const [passangerRides, setPassangerRides] = useState<RideSchema[] | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (user?.vehicle_plate) {
        const res = await getUserRides(user.id);
        setPassangerRides(res);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="h-full mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your booked rides
      </h2>
      {loading ? (
        <div className="loading-layout">
          <MoonLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passangerRides ? (
            passangerRides.map((ride, index) => (
              <PassengerRideCard
                key={index}
                ride={ride}
                setPassangerRides={setPassangerRides}
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

export default PassangerRides;
