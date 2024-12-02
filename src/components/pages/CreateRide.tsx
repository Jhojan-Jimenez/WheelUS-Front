import { useAuth } from '@/hooks/useAuth';
import { createRide, recommendedFee } from '@/lib/api/ride';
import { rideSchema } from '@/lib/formValidators';
import { reverseGeocodeAndShowMarker } from '@/lib/utils';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import RouteMap from '../map/RouteMap';
import Link from '../ui/Link';

export default function CreateRide() {
  const { vehicle } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [fee, setRecommendedFee] = useState(3000);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  const [routeNames, setRouteNames] = useState<string[]>([]);

  const onRouteChange = async (route: string[]) => {
    const routeNames = await Promise.all(
      route.map(async (point: string) => {
        const [lat, lng] = point.split(',');
        return await reverseGeocodeAndShowMarker(lat, lng);
      })
    );
    const recomFee = await recommendedFee(
      routeNames[0],
      routeNames[routeNames.length - 1]
    );
    setRecommendedFee(recomFee);

    setRouteNames(routeNames);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      setRecommendedFee(3000);

      if (routeNames.length < 2) {
        Swal.fire({
          title: 'Error!',
          text: 'Por favor selecciona una ruta con origen y destino',
          icon: 'error',
        });
        return;
      }

      if (formData.available_seats > (vehicle?.seats ?? 0)) {
        console.log(vehicle);

        Swal.fire({
          title: 'Error!',
          text: `Por favor elije entre 1 a ${vehicle?.seats ?? 0} asientos`,
          icon: 'error',
        });
        return;
      }
      const tripData = {
        ...formData,
        departure: formData.departure,
        vehicle_plate: vehicle?.plate ?? '',
        destination: routeNames[routeNames.length - 1],
        origin: routeNames[0],
        route: routeNames,
      };
      const validation = rideSchema.safeParse(tripData);
      if (validation.success) {
        await createRide(validation.data);
        Swal.fire({
          title: 'Excelente!',
          text: 'Ruta Registrada Correctamente',
          icon: 'success',
        });
        navigate('/myRides');
      } else {
        setErrors(
          Object.fromEntries(
            Object.entries(validation.error.flatten().fieldErrors).map(
              ([key, value]) => [key, value?.join(', ') || '']
            )
          )
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        Swal.fire({
          title: 'Error!',
          text: 'Algunos campos no estan llenos correctamente',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Error del servidor',
          icon: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[1440px] p-4 md:border rounded-lg md:shadow-lg flex flex-col gap-4 lg:h-[70vh]"
      encType="multipart/form-data"
    >
      <Link
        className="text-gray-400 hover:text-gray-800 flex mb-5"
        href="/myRides"
      >
        <ChevronLeft /> Volver
      </Link>
      {loading ? (
        <div className="loading-layout">
          <BeatLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-2 lg:flex-row h-full">
          <div className="flex-1 h-full">
            <div className="h-full lg:flex">
              <RouteMap onRouteChange={onRouteChange} />
              {routeNames.length > 0 && (
                <div className="z-[500] right-0 bg-white shadow-lg rounded-lg p-4  m-2 overflow-y-auto h-fit max-h-[400px] w-full lg:w-1/3">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    Paradas
                  </h2>
                  <ul
                    id="stops"
                    className="list-disc list-inside text-gray-600 space-y-2"
                  >
                    {routeNames.map((stop, index) => {
                      return <li key={index}>{stop}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>

            {errors.origin && (
              <p className="text-red-500 text-sm mt-1">
                Origin: {errors.origin}
              </p>
            )}
            {errors.destination && (
              <p className="text-red-500 text-sm mt-1">
                Destination: {errors.destination}
              </p>
            )}
            {errors.route && (
              <p className="text-red-500 text-sm mt-1">Route: {errors.route}</p>
            )}
          </div>
          <div className="flex lg:w-2/5 items-center justify-center">
            <div className="w-full max-w-[400px] flex flex-col gap-2 py-2 lg:px-2">
              {['fee', 'available_seats'].map((field: string) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-gray-700 mb-2 capitalize"
                  >
                    {field === 'available_seats'
                      ? 'Cupos disponibles'
                      : 'Tarifa única del Wheels'}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    onChange={handleChange}
                    value={formData[field] || ''}
                    placeholder={
                      field === 'available_seats'
                        ? vehicle?.seats
                        : `Tarifa Sugerida: ${fee}`
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">
                      *{errors[field]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="departure" className="block text-gray-700 mb-2">
                  Hora de Salida
                </label>
                <input
                  type="datetime-local"
                  id="departure"
                  name="departure"
                  value={formData.departure || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {errors.departure && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.departure}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase"
              >
                Registrar Ruta
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
