import { getAvaliableRides } from '@/lib/api/ride';
import { RideSchema } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { FilterContent } from '../rides/rideList/Filters';
import { Index } from '../rides/rideList/Index';
import Modal from '../modals/Modal';
import RideCard from '../rides/rideList/RideCard';

const Rides: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeRides, setActiveRides] = useState<RideSchema[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSpotFilterOpen, setIsSpotFilterOpen] = useState(false);
  const [isStartFilterOpen, setIsStartFilterOpen] = useState(false);
  const [isEndFilterOpen, setIsEndFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const spots = searchParams.get('spots');
  const startPoint = searchParams.get('start');
  const endPoint = searchParams.get('end');
  const page = searchParams.get('page');

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { total, rides } = await getAvaliableRides({
        origin: startPoint,
        destination: endPoint,
        seats: spots ? parseInt(spots) : 1,
        page: Number(page) ? Number(page) : 1,
      });
      setTotal(total);
      setActiveRides(rides);
      setLoading(false);
    };
    fetchData();
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [page, endPoint, startPoint, spots]);

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

  return (
    <div className="p-4 h-full w-full shadow-lg ">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
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
            <FilterContent
              isStartFilterOpen={isStartFilterOpen}
              setIsStartFilterOpen={setIsStartFilterOpen}
              isEndFilterOpen={isEndFilterOpen}
              setIsEndFilterOpen={setIsEndFilterOpen}
              isSpotFilterOpen={isSpotFilterOpen}
              setIsSpotFilterOpen={setIsSpotFilterOpen}
              applyFilter={applyFilter}
            />
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
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <BeatLoader color="#028747" />
          </div>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRides.map((ride, index) => (
              <RideCard key={index} ride={ride} />
            ))}
          </div>
        )}

        {total > 1 && (
          <Index
            totalRides={total}
            setCurrentPage={setCurrentPage}
            setSearchParams={setSearchParams}
            currentPage={currentPage}
          />
        )}
      </div>
      {isFilterModalOpen && (
        <Modal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
        >
          <div className="h-full flex flex-col">
            <h3 className="text-2xl font-bold mb-6">Filtros</h3>
            <FilterContent
              inModal={true}
              isStartFilterOpen={isStartFilterOpen}
              setIsStartFilterOpen={setIsStartFilterOpen}
              isEndFilterOpen={isEndFilterOpen}
              setIsEndFilterOpen={setIsEndFilterOpen}
              isSpotFilterOpen={isSpotFilterOpen}
              setIsSpotFilterOpen={setIsSpotFilterOpen}
              applyFilter={applyFilter}
            />
            {(spots || startPoint || endPoint) && (
              <button
                onClick={clearFilters}
                className="mt-auto w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Rides;
