import { createContext, useContext } from 'react';

type LoadingContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export const useLoading = () => {
  return useContext(LoadingContext);
};
