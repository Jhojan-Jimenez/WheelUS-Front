import { api, setAuthHeader } from './Config';
import { CreateRideSchema } from '../types';

export async function getAvaliableRides({
  origin = '',
  destination = '',
  seats = 1,
  page = 1,
}: {
  origin?: string | null;
  destination?: string | null;
  seats?: number;
  page?: number;
}) {
  const body = {
    origin,
    destination,
    seats,
    offset: (page - 1) * 6,
    limit: 6,
  };
  setAuthHeader();

  const res = await api.post('/ride/get-rides', body);
  return res.data;
}
export async function getOrigins() {
  const res = await api.get('/ride/start-routes');

  return res.data.origins;
}
export async function getDestinations() {
  const res = await api.get('/ride/end-routes');

  return res.data.destinations;
}
export async function getRideById(rideId: string) {
  setAuthHeader();
  const res = await api.get(`/ride/${rideId}`);
  return res.data.ride;
}
export async function createRide(data: CreateRideSchema) {
  const res = await api.post('/ride/', data);
  return res;
}

export async function deleteRide(rideId: string) {
  const res = await api.delete(`/ride/${rideId}`);
  return res;
}
export async function recommendedFee(start: string, end: string) {
  const res = await api.get(`/ride/fee?startPoint=${start}&endPoint=${end}`);
  return res.data.recommendedFee;
}

// export async function transmilenioRoutes() {
//   const url =
//     'https://gis.transmilenio.gov.co/arcgis/rest/services/Troncal/consulta_estaciones_troncales/FeatureServer/0/query?where=1%3D1&outFields=nombre_estacion&outSR=4326&f=json';
//   const res = await fetch(url);
//   const data = await res.json();
//   const nombresEstacion = data.features
//     .map((feature) => feature.attributes.nombre_estacion.toString())
//     .filter(
//       (name) =>
//         (name.includes('Calle') ||
//           name.includes('Norte') ||
//           name.includes('AV.')) &&
//         !name.includes('-')
//     );
//   return nombresEstacion;
// }
