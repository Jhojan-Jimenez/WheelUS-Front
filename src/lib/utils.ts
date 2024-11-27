import { AxiosError } from 'axios';
import { format } from 'date-fns';

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
