import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { getVehicleByPlate, modifyVehicle } from '@/lib/api/vehicle';
import { vehicleModifySchema } from '@/lib/formValidators';
import { vehicleModifyData, VehicleSchema } from '@/lib/types';
import { normalizeValidationBackErrors } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useState, ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

export default function MyVehicle() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<vehicleModifyData>({
    resolver: zodResolver(vehicleModifySchema),
  });
  const [editedVehicle, setEditedVehicle] = useState<Partial<VehicleSchema>>(
    {}
  );
  const [soatPreview, setSoatPreview] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleSchema | null>(null);
  const { setLoading } = useLoading();
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (user?.vehicle_plate) {
        const res = await getVehicleByPlate(user.vehicle_plate);
        setVehicle(res);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (id === 'SOAT') {
          setSoatPreview(reader.result as string);
        } else if (id === 'vehiclePhoto') {
          setPhotoPreview(reader.result as string);
        }
        setEditedVehicle((prev) => ({ ...prev, [id]: file }));
      };
      reader.readAsDataURL(file);
    } else {
      setEditedVehicle((prev) => ({ ...prev, [id]: value }));
    }
  };

  const onSubmit = async (data: vehicleModifyData) => {
    setLoading(true);
    try {
      if (vehicle?.plate) {
        await modifyVehicle(data, vehicle.plate);
      }
      Swal.fire({
        title: 'Excelente!',
        text: 'Cambios Realizados Correctamente',
        icon: 'success',
      });
    } catch (error) {
      let validateErrors = '';
      if (isAxiosError(error) && error?.response?.data.errors) {
        validateErrors = normalizeValidationBackErrors(
          error.response.data.errors
        );
      }
      if (isAxiosError(error)) {
        Swal.fire({
          title: 'Error!',
          text: `${error?.response?.data.message} ${validateErrors}`,
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
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Vehicle Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              {...register('model', { onChange: handleInputChange })}
              defaultValue={editedVehicle.model || vehicle?.model || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model?.message as string}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              {...register('brand', { onChange: handleInputChange })}
              defaultValue={editedVehicle.brand || vehicle?.brand || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand?.message as string}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="SOAT"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-xs sm:text-base inline-block mb-2"
          >
            SOAT Document
          </label>
          <input
            type="file"
            id="SOAT"
            {...register('soat', { onChange: handleInputChange })}
            accept="image/jpeg, image/png, image/gif"
            className="hidden"
          />
          {errors.soat && (
            <p className="text-red-500 text-sm mt-1">
              {errors.soat?.message as string}
            </p>
          )}
          {(soatPreview || vehicle?.SOAT) && (
            <img
              src={soatPreview || vehicle?.SOAT}
              alt="SOAT Preview"
              className="mt-2 max-w-full h-auto rounded-md"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="vehiclePhoto"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-xs sm:text-base inline-block mb-2"
          >
            Vehicle Photo
          </label>
          <input
            type="file"
            id="vehiclePhoto"
            {...register('vehiclePhoto', { onChange: handleInputChange })}
            accept="image/jpeg, image/png, image/gif"
            className="hidden"
          />
          {errors.vehiclePhoto && (
            <p className="text-red-500 text-sm mt-1">
              {errors.vehiclePhoto?.message as string}
            </p>
          )}
          {(photoPreview || vehicle?.photo) && (
            <img
              src={photoPreview || vehicle?.photo}
              alt="SOAT Preview"
              className="mt-2 max-w-full h-auto rounded-md"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Seats: {vehicle?.seats || ''}
            </p>
            <p className="text-sm text-gray-600">
              Plate: {vehicle?.plate || ''}
            </p>
          </div>
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
