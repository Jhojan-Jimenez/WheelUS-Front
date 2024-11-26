import GeneralLoader from '@/components/modals/GeneralLoader';
import { useState, ReactNode } from 'react';
import { LoadingContext } from '@/hooks/useLoading';

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && <GeneralLoader />}
      {children}
    </LoadingContext.Provider>
  );
};
