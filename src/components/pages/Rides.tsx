import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RideCard from '../rides/RideCard';
import Modal from '../rides/Modal';
import ReactDOM from 'react-dom';

// Mock data for demonstration (30 rides)
const mockRides = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  imageSrc: '/placeholder.svg?height=80&width=80',
  timestamp: `Nov ${29 + i}, ${(i % 12) + 1}:${(i % 60).toString().padStart(2, '0')} ${i % 2 === 0 ? 'AM' : 'PM'}`,
  spots: (i % 4) + 1,
  startPoint: ['New York', 'Los Angeles', 'Chicago', 'Miami'][i % 4],
  endPoint: ['Boston', 'San Francisco', 'Detroit', 'Orlando'][i % 4],
}));

const Rides: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSpotFilterOpen, setIsSpotFilterOpen] = useState(false);
  const [isStartFilterOpen, setIsStartFilterOpen] = useState(false);
  const [isEndFilterOpen, setIsEndFilterOpen] = useState(false);

  const spots = searchParams.get('spots');
  const startPoint = searchParams.get('start');
  const endPoint = searchParams.get('end');
  const page = searchParams.get('page');

  useEffect(() => {
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [page]);

  const applyFilter = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      prev.delete('page');
      return prev;
    });
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const filteredRides = mockRides.filter((ride) => {
    if (spots && ride.spots < parseInt(spots)) return false;
    if (startPoint && ride.startPoint !== startPoint) return false;
    if (endPoint && ride.endPoint !== endPoint) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredRides.length / 12);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * 12,
    currentPage * 12
  );

  const FilterDropdown = ({
    isOpen,
    setIsOpen,
    title,
    options,
    filterKey,
  }: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    options: string[];
    filterKey: string;
  }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-300"
      >
        {title}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                applyFilter(filterKey, option);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const FilterContent = ({ inModal = false }) => (
    <div
      className={` ${inModal ? 'flex flex-col items-center h-3/4 justify-around' : 'w-full flex gap-2'}`}
    >
      <FilterDropdown
        isOpen={isStartFilterOpen}
        setIsOpen={setIsStartFilterOpen}
        title="Punto de inicio"
        options={['New York', 'Los Angeles', 'Chicago', 'Miami']}
        filterKey="start"
      />
      <FilterDropdown
        isOpen={isEndFilterOpen}
        setIsOpen={setIsEndFilterOpen}
        title="Punto de llegada"
        options={['Boston', 'San Francisco', 'Detroit', 'Orlando']}
        filterKey="end"
      />
      <FilterDropdown
        isOpen={isSpotFilterOpen}
        setIsOpen={setIsSpotFilterOpen}
        title="Cupos disponibles"
        options={['1', '2', '3', '4']}
        filterKey="spots"
      />
    </div>
  );

  return (
    <div className="p-4 h-full w-full shadow-lg ">
      <div className="max-w-6xl mx-auto ">
        <div className="mb-6 bg-white rounded-lg shadow p-4 ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Rides disponibles
            </h2>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="md:hidden px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors duration-300"
            >
              Filtros
            </button>
          </div>
          <div className="hidden md:flex md:gap-4 ">
            <FilterContent />
            {(spots || startPoint || endPoint) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300 text-nowrap"
              >
                Limpiar filtros
              </button>
            )}
          </div>
          {(spots || startPoint || endPoint) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {spots && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  {spots}+ cupos
                </span>
              )}
              {startPoint && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  Desde: {startPoint}
                </span>
              )}
              {endPoint && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  Hasta: {endPoint}
                </span>
              )}
            </div>
          )}
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {paginatedRides.map((ride, index) => (
            <RideCard
              key={index}
              imageSrc={ride.imageSrc}
              timestamp={ride.timestamp}
              spots={ride.spots}
              startPoint={ride.startPoint}
              endPoint={ride.endPoint}
              onClick={() => console.log('Route clicked', ride.id)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      setSearchParams((prev) => {
                        prev.set('page', pageNum.toString());
                        return prev;
                      });
                    }}
                    className={`px-4 py-2 ${
                      currentPage === pageNum
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } text-sm font-medium ${
                      pageNum === 1
                        ? 'rounded-l-md'
                        : pageNum === totalPages
                          ? 'rounded-r-md'
                          : ''
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
      {isFilterModalOpen &&
        ReactDOM.createPortal(
          <Modal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Filtros</h3>
              <FilterContent inModal={true} />
              {(spots || startPoint || endPoint) && (
                <button
                  onClick={clearFilters}
                  className="mt-auto w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </Modal>,

          document.body
        )}
    </div>
  );
};

export default Rides;
