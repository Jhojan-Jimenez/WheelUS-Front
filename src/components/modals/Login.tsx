import { useState } from 'react';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { userLogSchema } from '@/lib/formValidators';
import { userLogData } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoading } from '@/hooks/useLoading';
import { useAuth } from '@/hooks/useAuth';
import Swal from 'sweetalert2';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogData>({
    resolver: zodResolver(userLogSchema),
  });
  const { signin } = useAuth();
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [typeInput, setInputType] = useState('password');
  const onSubmit = async (data: userLogData) => {
    setLoading(true);
    try {
      await signin(data);
      Swal.fire({
        title: 'Excelente!',
        text: 'Has iniciado sesión correctamente',
        icon: 'success',
      }).then(() => {
        navigate('/rides');
      });
    } catch (error) {
      if (isAxiosError(error)) {
        Swal.fire({
          title: 'Error!',
          text: error.response?.data?.message || 'Error desconocido',
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
    <div
      className="absolute z-10 flex items-center justify-center h-full w-full inset-0 bg-gray-500 bg-opacity-80 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-auto flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-white w-auto rounded-lg"
          encType="multipart/form-data"
        >
          <button
            className="text-gray-400 hover:text-gray-800 flex py-3 px-1 border-none"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <ChevronLeft /> Volver
          </button>
          <section className="p-4 w-full flex flex-col gap-4">
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-gray-700 mb-2 capitalize"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register('email')}
                name="email"
                placeholder="ejemplo@unisabana.edu.co"
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors['email'] && (
                <p className="text-red-500 text-sm mt-1 error-text">
                  *{String(errors['email']?.message)}
                </p>
              )}
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-gray-700 mb-2 capitalize"
              >
                Password
              </label>
              <div className="flex border rounded-lg">
                <input
                  type={typeInput}
                  id="password"
                  {...register('password')}
                  placeholder="ej: P@assWord_123"
                  className="w-full px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() =>
                    setInputType((prev) =>
                      prev === 'password' ? 'text' : 'password'
                    )
                  }
                  className="text-gray-400 hover:text-gray-800 border-l px-3"
                >
                  {typeInput === 'password' ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors['password'] && (
                <p className="text-red-500 text-sm mt-1 error-text">
                  *{String(errors['password']?.message)}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#028747] hover:bg-[#025C31] text-white py-2 rounded-md font-semibold mt-4"
            >
              Iniciar Sesión
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}
