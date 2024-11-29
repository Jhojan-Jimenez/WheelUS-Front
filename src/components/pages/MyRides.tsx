import { useRole } from '@/hooks/useRol';
import DriverRides from '../rides/myRides/DriverDrives';
import PassengerRides from '../rides/myRides/PassengerRides';

export default function MyRides() {
  const { currentRole } = useRole();
  return (
    <>{currentRole === 'driver' ? <DriverRides /> : <PassengerRides />};</>
  );
}
