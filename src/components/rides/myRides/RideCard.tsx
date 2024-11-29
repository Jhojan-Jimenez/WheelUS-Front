import React from 'react';

interface RideCardProps {
  id: number;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  isDriverView?: boolean;
}

const RideCard: React.FC<RideCardProps> = ({
  id,
  from,
  to,
  date,
  time,
  seats,
  price,
  isDriverView = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {from} to {to}
          </h3>
          <p className="text-sm text-gray-600">
            {date} at {time}
          </p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          ${price}
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">{seats} seats available</span>
        {isDriverView ? (
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Edit Ride
          </button>
        ) : (
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RideCard;
