import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Link from '../ui/Link';
import { userModifySchema } from '@/lib/formValidators';
import { userModifyData, UserSchema } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';
import { ChangeEvent, useState } from 'react';
import { useLoading } from '@/hooks/useLoading';
import { modifyUser } from '@/lib/api/user';
import Swal from 'sweetalert2';
import { isAxiosError } from 'axios';
import { normalizeValidationBackErrors } from '@/lib/utils';
import anonym from '@/assets/anonym.png';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [editedProfile, setEditedProfile] = useState<Partial<UserSchema>>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userModifyData>({
    resolver: zodResolver(userModifySchema),
  });
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'photo') {
          setPhotoPreview(reader.result as string);
        }
        setEditedProfile((prev) => ({ ...prev, [name]: file }));
      };
      reader.readAsDataURL(file);
    } else {
      setEditedProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (data: userModifyData) => {
    setLoading(true);
    try {
      if (user?.id) {
        const patchUser = await modifyUser(data, user.id);
        if (patchUser) {
          setUser(patchUser);
          Swal.fire({
            title: 'Excelente!',
            text: 'Cambios Realizados Correctamente',
            icon: 'success',
          });
        }
      }
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
    <section className=" mx-auto h-fit flex gap-4 justify-center items-center sm:items-start p-10 flex-col w-full max-w-6xl  ">
      <section className="flex flex-col justify-start items-start gap-4">
        <Link className="text-gray-400 hover:text-gray-800 flex" href="/rides">
          <ChevronLeft /> Volver
        </Link>
      </section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-4 flex flex-col lg:flex-row items-center 2xl:gap-10 mx-auto "
        encType="multipart/form-data"
      >
        <div className="flex flex-1 flex-col justify-center items-center gap-4 rounded-full border-2 border-[#025C31] overflow-hidden w-96 h-96 2xl:w-[500px] 2xl:h-[500px]">
          <img
            src={photoPreview || user?.photo || anonym}
            alt="Picture of the author"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          {(['name', 'lastname', 'contact'] as const).map((field) => (
            <div key={field} className="mb-2">
              <label htmlFor={field} className="text-gray-700 my-5 capitalize">
                {field === 'contact'
                  ? 'Contacto'
                  : field === 'name'
                    ? 'Nombre'
                    : field === 'lastname'
                      ? 'Apellido'
                      : ''}
              </label>
              <input
                type="text"
                id={field}
                {...register(field)}
                defaultValue={`${
                  field === 'contact'
                    ? editedProfile.contact || user?.contact
                    : field === 'name'
                      ? editedProfile.name || user?.name
                      : field === 'lastname'
                        ? editedProfile.lastname || user?.lastname
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
          <div className="my-4">
            <label
              htmlFor="photo"
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-xs sm:text-base inline-block"
            >
              Cambiar imagen
            </label>
            <input
              type="file"
              id="photo"
              {...register('photo', { onChange: handleInputChange })}
              accept="image/jpeg, image/png, image/gif"
              className="hidden"
            />
          </div>

          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.photo?.message as string}
            </p>
          )}

          <button
            type="submit"
            className="w-full green text-white py-2 rounded-md font-semibold uppercase"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </section>
  );
}
