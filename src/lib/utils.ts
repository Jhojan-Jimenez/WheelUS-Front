import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { FirestoreTimestamp } from './types';

export const normalizeValidationBackErrors = (err: AxiosError): string => {
  let errorMessage = 'Ocurrió un error:';

  if (err.response && err.response.data) {
    const data = err.response.data as Record<string, { _errors?: string[] }>;

    for (const field in data) {
      if (data[field]?._errors) {
        const fieldErrors = data[field]._errors.join(', ');
        errorMessage += `\n${field}: ${fieldErrors}`;
      }
    }
  } else {
    errorMessage = err.message || 'Error desconocido.';
  }

  return errorMessage;
};

export const formatDateFront = (date: string | number | Date): string => {
  return format(new Date(date), 'dd/MM/yyyy');
};
export function formatFirestoreTimestamp(
  timestamp: FirestoreTimestamp
): string {
  const date = new Date(
    timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
  );
  return date.toLocaleString();
}

export async function reverseGeocodeAndShowMarker(
  latitude: string,
  longitude: string
) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    const res = await fetch(url);
    const data = await res.json();

    const formattedAddress = data.display_name.split(',').slice(0, 3).join('');

    return formattedAddress;
  } catch (error) {
    console.log(
      'Error obteniendo el nombre de un punto por su latitud y longitud: ',
      error
    );
  }
}
