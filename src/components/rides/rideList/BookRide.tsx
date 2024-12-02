import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { useRole } from '@/hooks/useRol';
import { addBookingRide } from '@/lib/api/user';
import { RideSchema } from '@/lib/types';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface StopSelectorProps {
  availableStops: string[];
  ride: RideSchema;
}

const BookRide: React.FC<StopSelectorProps> = ({ availableStops, ride }) => {
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const addStop = (stop: string) => {
    setSelectedStops((prev) => [...prev, stop]);
  };
  const { setCurrentRole } = useRole();
  const removeStop = (index: number) => {
    setSelectedStops((prev) => prev.filter((_, i) => i !== index));
  };
  const { user } = useAuth();
  const bookRides = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        await addBookingRide(user.id, ride.id, selectedStops);
      }
      Swal.fire({
        title: 'Success!',
        text: 'Ride booked successfully',
        icon: 'success',
      });
      setLoading(false);
      setCurrentRole('passenger');
      navigate('/myRides');
    } catch (error) {
      if (isAxiosError(error)) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data.message,
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 max-h-[80vh]">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Select Your Stops
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Available Stops
          </h3>
          <div className="bg-gray-50 rounded-md p-4 h-72 overflow-y-auto">
            {availableStops.map((stop, index) => (
              <button
                key={index}
                onClick={() => addStop(stop)}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-emerald-100 transition-colors duration-200 mb-2"
              >
                {stop}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Selected Stops
          </h3>
          <div className="bg-gray-50 rounded-md p-4 h-72 overflow-y-auto">
            {selectedStops.length === 0 ? (
              <p className="text-gray-500 italic">No stops selected yet</p>
            ) : (
              selectedStops.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white rounded-md p-2 mb-2 shadow-sm"
                >
                  <span className="flex items-center">
                    <span className=" bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold p-2 mr-2">
                      {index + 1}
                    </span>
                    {stop}
                  </span>
                  <button
                    onClick={() => removeStop(index)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <button
        className="items-center px-4 py-1.5 bg-emerald-500 text-white text-md font-medium rounded-full hover:bg-emerald-600 transition-colors duration-200"
        onClick={() => bookRides()}
      >
        Reservar
      </button>
    </div>
  );
};

export default BookRide;
