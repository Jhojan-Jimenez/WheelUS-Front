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
              </Routes>
            </MainLayout>
          </RoleProvider>
        </AuthProvider>
      </LoadingProvider>
    </Router>
  );
}

export default App;
