import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLoad = (asyncFunction: (...args: any[]) => Promise<any>) => {
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const execute = async (...args: any[]) => {
    setLoading(true);
    const result = await asyncFunction(...args);
    setLoading(false);
    return result;
  };

  return { loading, execute };
};
export default useLoad;
