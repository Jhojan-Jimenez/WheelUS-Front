export const FilterDropdown = ({
  isOpen,
  setIsOpen,
  title,
  options,
  filterKey,
  applyFilter,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  options: string[];
  filterKey: string;
  applyFilter: (key: string, value: string) => void;
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

export const FilterContent = ({
  inModal = false,
  isStartFilterOpen,
  setIsStartFilterOpen,
  isEndFilterOpen,
  setIsEndFilterOpen,
  isSpotFilterOpen,
  setIsSpotFilterOpen,
  applyFilter,
}: {
  inModal?: boolean;
  isStartFilterOpen: boolean;
  setIsStartFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEndFilterOpen: boolean;
  setIsEndFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSpotFilterOpen: boolean;
  setIsSpotFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilter: (key: string, value: string) => void;
}) => (
  <div
    className={` ${inModal ? 'flex flex-col items-center h-3/4 justify-around' : 'w-full flex gap-2'}`}
  >
    <FilterDropdown
      isOpen={isStartFilterOpen}
      setIsOpen={setIsStartFilterOpen}
      applyFilter={applyFilter}
      title="Punto de inicio"
      options={['New York', 'Los Angeles', 'Chicago', 'Miami']}
      filterKey="start"
    />
    <FilterDropdown
      isOpen={isEndFilterOpen}
      setIsOpen={setIsEndFilterOpen}
      applyFilter={applyFilter}
      title="Punto de llegada"
      options={['Boston', 'San Francisco', 'Detroit', 'Orlando']}
      filterKey="end"
    />
    <FilterDropdown
      isOpen={isSpotFilterOpen}
      setIsOpen={setIsSpotFilterOpen}
      applyFilter={applyFilter}
      title="Cupos disponibles"
      options={['1', '2', '3', '4']}
      filterKey="spots"
    />
  </div>
);
