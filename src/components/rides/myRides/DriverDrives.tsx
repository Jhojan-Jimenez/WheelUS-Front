import React, { useState } from 'react';
import RideCard from './RideCard';

// Mock data for driver rides
const driverRides = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  from: `City ${i + 1}`,
  to: `City ${i + 2}`,
  date: `2023-06-${(i + 1).toString().padStart(2, '0')}`,
  time: `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
  seats: Math.floor(Math.random() * 4) + 1,
  price: Math.floor(Math.random() * 50) + 10,
}));

const DriverRides: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ridesPerPage = 6;

  const indexOfLastRide = currentPage * ridesPerPage;
  const indexOfFirstRide = indexOfLastRide - ridesPerPage;
  const currentRides = driverRides.slice(indexOfFirstRide, indexOfLastRide);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Created Rides
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentRides.map((ride) => (
          <RideCard key={ride.id} {...ride} isDriverView={true} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          {Array.from(
            { length: Math.ceil(driverRides.length / ridesPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`px-4 py-2 text-sm font-medium ${
                  currentPage === i + 1
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } ${i === 0 ? 'rounded-l-md' : ''} ${
                  i === Math.ceil(driverRides.length / ridesPerPage) - 1
                    ? 'rounded-r-md'
                    : ''
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default DriverRides;
