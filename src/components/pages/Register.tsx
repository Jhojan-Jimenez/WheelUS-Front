'use client';

import Link from '@/components/ui/Link';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { userRegSchema } from '@/lib/formValidators';
import { userRegData } from '@/lib/types';
import { normalizeValidationBackErrors } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { setLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegData>({
    resolver: zodResolver(userRegSchema),
  });

  const onSubmit = async (data: userRegData) => {
    setLoading(true);
    try {
      await signup(data);
      Swal.fire({
        title: 'Excelente!',
        text: 'Usuario Registrado Correctamente',
        icon: 'success',
      });
      navigate('/rides');
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
      className="w-full max-w-[600px] p-4 border rounded-lg shadow-lg"
      encType="multipart/form-data"
    >
      <Link className="text-gray-400 hover:text-gray-800 flex mb-5" href="/">
        <ChevronLeft /> Volver
      </Link>
      <div className="mb-4 flex flex-row gap-2">
        <div className="flex-1">
          <label htmlFor="name" className="block text-gray-700 mb-2 capitalize">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder={`e.j: Pepito`}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors['name'] && (
            <p className="text-red-500 text-sm mt-1 error-text">
              *{String(errors['name']?.message)}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label
            htmlFor="lastname"
            className="block text-gray-700 mb-2 capitalize"
          >
            Apellido
          </label>
          <input
            type="text"
            id="lastname"
            {...register('lastname')}
            placeholder={`e.j: Perez`}
            className="w-full px-3 py-2 border rounded-lg "
          />
          {errors['lastname'] && (
            <p className="text-red-500 text-sm mt-1 error-text">
              *{String(errors['lastname']?.message)}
            </p>
          )}
        </div>
      </div>
      {(['email', 'id', 'contact', 'password'] as const).map((field) => (
        <div key={field} className="mb-4">
          <label
            htmlFor={field}
            className="block text-gray-700 mb-2 capitalize"
          >
            {field === 'email'
              ? 'Email'
              : field === 'contact'
                ? 'Contacto'
                : field === 'id'
                  ? 'Id'
                  : field === 'password'
                    ? 'Contraseña'
                    : ''}
          </label>
          <input
            type="text"
            id={field}
            {...register(field)}
            placeholder={`e.j: ${
              field === 'email'
                ? 'ejemplo@unisabana.edu.co'
                : field === 'contact'
                  ? '3124567890'
                  : field === 'id'
                    ? '123456'
                    : field === 'password'
                      ? 'P@ssWord_123'
                      : ''
            }`}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1 error-text">
              *{String(errors[field]?.message)}
            </p>
          )}
        </div>
      ))}
      <label htmlFor={'photo'} className="block text-gray-700 mb-2 capitalize">
        Foto de perfil
      </label>
      <div className="mb-4">
        <label
          htmlFor="photo"
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-xs sm:text-base inline-block"
        >
          Subir foto
        </label>
        <input
          type="file"
          id="photo"
          {...register('photo')}
          accept="image/jpeg, image/png, image/gif"
          className="hidden"
        />
      </div>
      {errors.photo && (
        <p className="text-red-500 text-sm mt-1 error-text">
          {String(errors.photo.message)}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md font-semibold uppercase"
      >
        Registrarse
      </button>
    </form>
  );
}
