import { useAuth } from '@/hooks/useAuth';
import { getVehicleByPlate } from '@/lib/api/vehicle';
import React, { useState, ChangeEvent, useEffect } from 'react';

interface VehicleSchema {
  SOAT: string;
  brand: string;
  id_driver: string;
  model: string;
  photo: string;
  plate: string;
  rides: string[];
  seats: string;
}

const MyVehicle = () => {
  const [editedVehicle, setEditedVehicle] = useState<Partial<VehicleSchema>>(
    {}
  );
  const [soatPreview, setSoatPreview] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleSchema | null>(null);
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
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'SOAT') {
          setSoatPreview(reader.result as string);
        } else if (name === 'photo') {
          setPhotoPreview(reader.result as string);
        }
        setEditedVehicle((prev) => ({ ...prev, [name]: file }));
      };
      reader.readAsDataURL(file);
    } else {
      setEditedVehicle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Vehicle Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="plate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Plate Number
            </label>
            <input
              type="text"
              id="plate"
              name="plate"
              value={editedVehicle.plate || vehicle?.plate || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label
              htmlFor="seats"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Seats
            </label>
            <input
              type="number"
              id="seats"
              name="seats"
              value={editedVehicle.seats || vehicle?.seats || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="SOAT"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            SOAT Document
          </label>
          <input
            type="file"
            id="SOAT"
            name="SOAT"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
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
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Foto del carro
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {(photoPreview || vehicle?.photo) && (
            <img
              src={photoPreview || vehicle?.photo}
              alt="Vehicle Preview"
              className="mt-2 max-w-full h-auto rounded-md"
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              Brand: {vehicle?.brand || ''}
            </p>
            <p className="text-sm text-gray-600">
              Model: {vehicle?.model || ''}
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
};

export default MyVehicle;
