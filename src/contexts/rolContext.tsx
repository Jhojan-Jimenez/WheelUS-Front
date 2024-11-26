import { RoleContext } from '@/hooks/useRol';
import { ReactNode, useState } from 'react';

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRole, setCurrentRole] = useState<'passenger' | 'driver'>(
    'passenger'
  );

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </RoleContext.Provider>
  );
};
