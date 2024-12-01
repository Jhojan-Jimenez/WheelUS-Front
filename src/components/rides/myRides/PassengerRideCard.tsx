import { useAuth } from '@/hooks/useAuth';
import { deleteBookingRide } from '@/lib/api/user';
import { RideSchema } from '@/lib/types';
import { formatDateFront } from '@/lib/utils';
import Swal from 'sweetalert2';

const PassengerRideCard = ({
  ride,
  setPassangerRides,
}: {
  ride: RideSchema;
  setPassangerRides: React.Dispatch<React.SetStateAction<RideSchema[] | []>>;
}) => {
  const { user } = useAuth();
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
      if (user?.id) {
        if (ride.point) {
          await deleteBookingRide(user.id, ride.rideId, ride.point);
        } else {
          Swal.fire('Error!', 'Ride point is missing.', 'error');
        }
      } else {
        Swal.fire('Error!', 'User ID is missing.', 'error');
      }

      setPassangerRides((prev: RideSchema[]) =>
        prev.filter((prevRide: RideSchema) => prevRide.rideId !== ride.rideId)
      );
      Swal.fire('Cancelado!', 'El viaje ha sido cancelado.', 'success');
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {ride.origin} to {ride.point}
          </h3>
          <p className="text-sm text-gray-600">
            {formatDateFront(ride.departure)}
          </p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          ${ride.fee}
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          {ride.available_seats} seats available
        </span>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={() => handleDelete()}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
};

export default PassengerRideCard;
