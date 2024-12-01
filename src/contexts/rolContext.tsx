import { RoleContext } from '@/hooks/useRol';
import { ReactNode, useEffect, useState } from 'react';

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<'passenger' | 'driver'>(() => {
    return (
      (sessionStorage.getItem('currentRole') as 'passenger' | 'driver') ||
      'passenger'
    );
  });

  useEffect(() => {
    sessionStorage.setItem('currentRole', currentRole);
  }, [currentRole]);

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
};
