import { z } from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];
const requiredString = (message: string = 'Este campo es obligatorio') =>
  z.string().min(1, message);

export const userLogSchema = z.object({
  email: requiredString()
    .email('Correo inválido')
    .regex(
      /@unisabana\.edu\.co$/,
      'Debe ser un correo institucional de la Universidad de la Sabana'
    ),
  password: requiredString(),
});

export const userRegSchema = z.object({
  name: requiredString()
    .max(50, 'No debe contener más de 50 caracteres')
    .regex(/^[a-zA-Z\s]+$/, 'Debe contener solo letras')
    .trim(),
  lastname: requiredString()
    .max(50, 'No debe contener más de 50 caracteres')
    .regex(/^[a-zA-Z\s]+$/, 'Debe contener solo letras')
    .trim(),
  id: requiredString('Debe contener 6 números')
    .length(6, 'Debe contener 6 números')
    .regex(/^\d{6}$/, 'Debe contener solo números'),
  email: requiredString('Correo es obligatorio')
    .email('Correo inválido')
    .regex(
      /@unisabana\.edu\.co$/,
      'Debe ser un correo institucional de la Universidad de la Sabana'
    ),
  password: requiredString()
    .min(6, 'Debe contener por lo menos 6 caracteres')
    .max(50, 'No debe contener más de 50 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>-])[A-Za-z\d!@#$%^&*(),.?":{}|<>]+$/,
      'Debe tener mayúsculas y minúsculas, un número y un carácter especial'
    ),
  contact: requiredString('El contacto es obligatorio').regex(
    /^\d{10}$/,
    'Debe tener 10 dígitos y contener solo números'
  ),
  photo: z
    .any()
    .optional()
    .refine(
      (fileList) =>
        !fileList || fileList.length === 0 || fileList[0].size <= 4194304,
      {
        message: 'La foto no debe pesar más de 4MB',
      }
    )
    .refine(
      (fileList) =>
        !fileList ||
        fileList.length === 0 ||
        ['image/jpeg', 'image/png', 'image/jpg'].includes(fileList[0].type),
      {
        message: 'La foto debe ser una imagen en formato (JPEG, PNG o JPG)',
      }
    ),
});
export const userModifySchema = userRegSchema
  .pick({
    name: true,
    lastname: true,
    contact: true,
    photo: true,
  })
  .partial();

export const vehicleRegSchema = z.object({
  plate: requiredString()
    .regex(
      /^([A-Z]{3})(\d{3})$/,
      'Debe contener 3 letras mayúsculas y 3 Numeros'
    )

    .max(6, 'Solo debe tener 3 letras y 3 números'),
  brand: requiredString(),
  model: requiredString(),
  seats: requiredString()
    .regex(/^[2-6]$/, 'Debe transportar de 2 a 6 pasajeros')
    .transform((val) => Number(val)),
  soat: z
    .any()
    .refine(
      (fileList) =>
        !fileList || fileList.length === 0 || fileList[0].size <= 4194304,
      {
        message: 'La foto no debe pesar más de 4MB',
      }
    )
    .refine(
      (fileList) =>
        !fileList ||
        fileList.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
      {
        message: 'La foto debe ser una imagen en formato (JPEG, PNG o JPG)',
      }
    ),
  vehiclePhoto: z
    .any()
    .refine(
      (fileList) =>
        !fileList || fileList.length === 0 || fileList[0].size <= 4194304,
      {
        message: 'La foto no debe pesar más de 4MB',
      }
    )
    .refine(
      (fileList) =>
        !fileList ||
        fileList.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
      {
        message: 'La foto debe ser una imagen en formato (JPEG, PNG o JPG)',
      }
    ),
});

export const vehicleModifySchema = vehicleRegSchema
  .pick({
    brand: true,
    model: true,
    soat: true,
    vehiclePhoto: true,
  })
  .partial();

export const rideSchema = z.object({
  vehicle_plate: requiredString(),
  available_seats: z.coerce
    .number({ message: 'Los asientos disponibles deben ser un número' })
    .min(1, 'La cantidad mínima de asientos disponibles es 1'),

  departure: z.coerce.date({ message: 'La fecha no es válida' }).refine(
    (date) => {
      const allowedTime = new Date();
      allowedTime.setHours(allowedTime.getHours() + 1);
      allowedTime.setSeconds(0);
      allowedTime.setMinutes(allowedTime.getMinutes() - 2);
      return date.getTime() >= allowedTime.getTime();
    },
    { message: 'La reserva debe ser al menos una hora adelante' }
  ),

  destination: requiredString(),

  fee: z.coerce
    .number({ message: 'La tarifa debe ser un número' })
    .positive({ message: 'La tarifa debe ser un valor positivo' }),

  origin: requiredString(),

  route: z.array(z.string()).min(2, 'La ruta debe tener al menos dos paradas'),
});

export const partialRideSchema = rideSchema
  .pick({
    vehicle_plate: true,
    available_seats: true,
    departure: true,
    destination: true,
    fee: true,
    origin: true,
    route: true,
  })
  .partial();

export const userIdFormSchema = z.object({
  userId: z.string().length(6, { message: 'El ID debe tener 6 caracteres' }),
});
