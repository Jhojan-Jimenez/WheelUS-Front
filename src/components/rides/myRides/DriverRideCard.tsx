import { deleteRide } from '@/lib/api/ride';
import { RideSchema } from '@/lib/types';
import { formatDateFront } from '@/lib/utils';
import Swal from 'sweetalert2';

const DriverRideCard = ({
  ride,
  setDriverRides,
}: {
  ride: RideSchema;
  setDriverRides: React.Dispatch<React.SetStateAction<RideSchema[]>>;
}) => {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro que deseas cancelar el viaje?',
      text: 'No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9C0000',
      cancelButtonColor: '#028747',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener viaje',
    });

    if (result.isConfirmed) {
      await deleteRide(ride.id);

      setDriverRides((prev: RideSchema[]) =>
        prev.filter((prevRide: RideSchema) => prevRide.id !== ride.id)
      );
      Swal.fire('Cancelado!', 'El viaje ha sido cancelado.', 'success');
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {ride.origin} to {ride.destination}
          </h3>
          <p className="text-sm text-gray-600">
            {formatDateFront(ride.departure)}
          </p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          ${ride.fee}
        </span>
      </div>
      {ride.passengers && ride.passengers.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Pasajeros:
          </h3>
          <div className="space-y-2">
            {ride.passengers.map((passenger, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-2 border-b last:border-0"
                >
                  <span className="text-gray-600 font-medium">
                    Id: {passenger.userId}
                  </span>
                  <span className="text-sm text-gray-500">
                    Cupos reservados: {passenger.cantidad}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          {ride.available_seats} seats available
        </span>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => handleDelete()}
        >
          Delete Ride
        </button>
      </div>
    </div>
  );
};

export default DriverRideCard;
