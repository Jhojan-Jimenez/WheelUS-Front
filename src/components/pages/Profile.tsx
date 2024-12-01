import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import { useForm } from 'react-hook-form';
import Link from '../ui/Link';
// import { useAuth } from '@/hooks/useAuth';
// import { useNavigate } from 'react-router-dom';
// import { useLoading } from '@/hooks/useLoading';
import { userModifySchema } from '@/lib/formValidators';
import { userModifyData } from '@/lib/types';
import { useAuth } from '@/hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();
  //   const navigate = useNavigate();
  //   const { setLoading } = useLoading();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userModifyData>({
    resolver: zodResolver(userModifySchema),
  });

  const onSubmit = async (data: userModifyData) => {
    console.log(data);

    // setLoading(true);
    // try {
    //   const patchUser = await modifyUser(data, user.id);
    //   setUser(patchUser);
    //   Swal.fire({
    //     title: 'Excelente!',
    //     text: 'Cambios Realizados Correctamente',
    //     icon: 'success',
    //   });
    //   router.push('/dashboard');
    // } catch (error) {
    //   let validateErrors = '';
    //   if (error.response.data.errors) {
    //     validateErrors = errorsMes(error.response.data.errors);
    //   }
    //   if (isAxiosError(error)) {
    //     Swal.fire({
    //       title: 'Error!',
    //       text: `${error.response.data.message} ${validateErrors}`,
    //       icon: 'error',
    //     });
    //   } else {
    //     Swal.fire({
    //       title: 'Error!',
    //       text: 'Error del servidor',
    //       icon: 'error',
    //     });
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <section className=" w-full h-fit flex gap-4 justify-center items-center sm:items-start p-10 flex-col sm:flex-row">
      <section className="flex flex-col justify-start items-start gap-4">
        <Link className="text-gray-400 hover:text-gray-800 flex" href="/rides">
          <ChevronLeft /> Volver
        </Link>
        <div className="flex flex-col justify-center items-center gap-4">
          <img
            src={user?.photo || '/images/anonym.png'}
            alt="Picture of the author"
            width={500}
            height={500}
            className="rounded-full object-cover max-w-[220px] max-h-[220px] min-w-[220px] min-h-[220px] border-2 sm:min-w-[260px] sm:max-w-[260px] sm:min-h-[260px] sm:max-h-[260px] cursor-pointer  border-[#025C31] "
          />
        </div>
      </section>

      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-4 rounded-lg"
          encType="multipart/form-data"
        >
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
                    ? user?.contact
                    : field === 'name'
                      ? user?.name
                      : field === 'lastname'
                        ? user?.lastname
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
              {...register('photo')}
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
        </form>
      </section>
    </section>
  );
}
