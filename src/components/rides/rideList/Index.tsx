export const Index = ({
  totalRides,
  setCurrentPage,
  setSearchParams,
  currentPage,
}: {
  totalRides: number;
  setCurrentPage: (page: number) => void;
  setSearchParams(searchParams: URLSearchParams | string): void;
  currentPage: number;
}) => {
  return (
    <div className="pt-8 flex justify-center mt-auto">
      <nav className="inline-flex rounded-md shadow">
        {Array.from({ length: Math.ceil(totalRides / 6) }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => {
                setCurrentPage(pageNum);
                const newParams = new URLSearchParams(window.location.search);
                newParams.set('page', pageNum.toString());
                setSearchParams(newParams);
              }}
              className={`px-4 py-2 ${
                currentPage === pageNum
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } text-sm font-medium ${
                pageNum === 1
                  ? 'rounded-l-md'
                  : pageNum === Math.ceil(totalRides / 10)
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
  );
};
