import Modal from '@/components/modals/Modal';
import useLoad from '@/hooks/useLoad';
import { useOpen } from '@/hooks/useOpen';
import { getVehicleByPlate } from '@/lib/api/vehicle';
import { RideSchema, VehicleSchema } from '@/lib/types';
import { formatDateFront } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

const RideCard: React.FC<{ ride: RideSchema }> = ({ ride }) => {
  const [vehicle, setVehicle] = useState<VehicleSchema | null>(null);
  const { isOpen, open, close, ref } = useOpen();
  const { loading, execute: fetchVehicle } = useLoad(getVehicleByPlate);
  const onClick = () => {
    console.log('Route clicked', ride.route);
    open();
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchVehicle(ride.vehicle_plate);
      setVehicle(res);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => close()} height="75vh">
          <div className="p-4 h-full" ref={ref}>
            <ul className="list-disc pl-4">
              {ride.route.map((route, index) => (
                <li key={index} className="text-gray-700">
                  {route}
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
      <div className="flex items-center p-4 gap-4">
        <div className="relative w-20 h-20 flex-shrink-0">
          {loading ? (
            <div className="loading-layout">
              <MoonLoader color="#028747" />
            </div>
          ) : (
            <img
              src={vehicle?.photo}
              alt="Vehicle"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="flex-grow space-y-2">
          <button
            onClick={onClick}
            className="inline-flex items-center px-4 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-colors duration-200"
          >
            Ver ruta
            <svg
              className="ml-1.5 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{formatDateFront(ride.departure)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-sm">{ride.available_seats} cupos</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">
              {ride.origin} → {ride.destination}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
