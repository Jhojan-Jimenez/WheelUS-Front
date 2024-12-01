import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '@/components/pages/Home';
import MainLayout from '@/components/layouts/MainLayout';
import Register from '@/components/pages/Register';
import Rides from './components/pages/Rides';
import { AuthProvider } from './contexts/sessionContext';
import { LoadingProvider } from './contexts/loadingContext';
import PublicRoute from './components/route/PublicRoute';
import ProtectedRoute from './components/route/AuthRoute';
import { RoleProvider } from './contexts/rolContext';
import CarRegister from './components/pages/CarRegister';
import Chat from './components/pages/Chat';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyRides from './components/pages/MyRides';
import Profile from './components/pages/Profile';
import VehicleRoute from './components/route/VehicleRoute';
import CreateRide from './components/pages/CreateRide';
import RoleRoute from './components/route/RoleRoute';
import MyVehicle from './components/pages/MyVehicle';

function App() {
  return (
    <Router>
      <ToastContainer />
      <LoadingProvider>
        <AuthProvider>
          <RoleProvider>
            <MainLayout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <Home />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/rides"
                  element={
                    <ProtectedRoute>
                      <Rides />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/car-register"
                  element={
                    <ProtectedRoute>
                      <CarRegister />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myRides"
                  element={
                    <ProtectedRoute>
                      <MyRides />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myVehicle"
                  element={
                    <ProtectedRoute>
                      <VehicleRoute>
                        <MyVehicle />
                      </VehicleRoute>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/myRides/create"
                  element={
                    <ProtectedRoute>
                      <RoleRoute>
                        <CreateRide />
                      </RoleRoute>
                    </ProtectedRoute>
                  }
                ></Route>
              </Routes>
            </MainLayout>
          </RoleProvider>
        </AuthProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
