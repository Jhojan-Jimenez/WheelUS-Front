import { vehicleRegSchema } from '@/lib/formValidators';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import { useForm } from 'react-hook-form';
import Link from '../ui/Link';
import { useLoading } from '@/hooks/useLoading';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { createVehicle } from '@/lib/api/vehicle';
import { normalizeValidationBackErrors } from '@/lib/utils';
import { vehicleRegData } from '@/lib/types';

export default function CarRegister() {
  const { user, setUser } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<vehicleRegData>({
    resolver: zodResolver(vehicleRegSchema),
  });

  const onSubmit = async (data: vehicleRegData) => {
    setLoading(true);
    try {
      if (user) {
        await createVehicle(data, user.id);
        setUser({ ...user, vehicle_plate: data.plate });
        Swal.fire({
          title: 'Excelente!',
          text: 'Vehiculo Registrado Correctamente',
          icon: 'success',
        });
        navigate('/rides');
      }
    } catch (error) {
      let validateErros = '';
      if (isAxiosError(error) && error.response?.data?.errors) {
        validateErros = normalizeValidationBackErrors(
          error.response.data.errors
        );
      }

      if (isAxiosError(error)) {
        Swal.fire({
          title: 'Error!',
          text: `${error.response?.data?.message || 'Unknown error'} ${validateErros}`,
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
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[600px] p-4 m-10 border rounded-lg shadow-lg"
      encType="multipart/form-data"
    >
      <Link
        className="text-gray-400 hover:text-gray-800 flex mb-5"
        href="/rides"
      >
        <ChevronLeft /> Volver
      </Link>
      <div className="mb-4 flex flex-row gap-2">
        <div className="flex-1">
          <label
            htmlFor="plate"
            className="block text-gray-700 mb-2 capitalize"
          >
            Placa
          </label>
          <input
            type={'text'}
            id="plate"
            {...register('plate')}
            placeholder={`e.j: 'ABC123'
                `}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors['plate'] && (
            <p className="text-red-500 text-sm mt-1">
              *{String(errors['plate']?.message)}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label
            htmlFor="brand"
            className="block text-gray-700 mb-2 capitalize"
          >
            Marca
          </label>
          <input
            type={'text'}
            id="brand"
            {...register('brand')}
            placeholder={`e.j: 'ABC123'
                `}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors['brand'] && (
            <p className="text-red-500 text-sm mt-1">
              *{String(errors['brand']?.message)}
            </p>
          )}
        </div>
      </div>
      {(['model', 'seats'] as (keyof vehicleRegData)[]).map((field) => (
        <div key={field} className="mb-4">
          <label
            htmlFor={field}
            className="block text-gray-700 mb-2 capitalize"
          >
            {field === 'model'
              ? 'Modelo'
              : field === 'seats'
                ? 'Capacidad'
                : ''}
          </label>
          <input
            type={'text'}
            id={field}
            {...register(field)}
            placeholder={`e.j: ${
              field === 'model'
                ? 'Cruz'
                : field === 'seats'
                  ? '5 (incluyendo conductor)'
                  : ''
            }`}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">
              *{String(errors[field]?.message)}
            </p>
          )}
        </div>
      ))}
      <label htmlFor={'soat'} className="block text-gray-700 mb-2 capitalize">
        SOAT
      </label>
      <div className="mb-4">
        <input
          type="file"
          id="soat"
          {...register('soat')}
          accept="image/jpeg, image/png, image/gif"
          className="text-xs sm:text-base"
          required
        />
      </div>
      {errors.soat && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors.soat.message)}
        </p>
      )}

      <label
        htmlFor={'vehiclePhoto'}
        className="block text-gray-700 mb-2 capitalize"
      >
        Foto Vehículo
      </label>
      <div className="mb-4">
        <input
          type="file"
          id="vehiclePhoto"
          {...register('vehiclePhoto')}
          accept="image/jpeg, image/png, image/gif"
          className="text-xs sm:text-base"
          required
        />
      </div>
      {errors.vehiclePhoto && (
        <p className="text-red-500 text-sm mt-1">
          {String(errors.vehiclePhoto.message)}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase"
      >
        Registrar Vehículo
      </button>
    </form>
  );
}
