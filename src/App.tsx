import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "@/components/pages/Home";
import MainLayout from "@/components/layouts/MainLayout";
import Register from "@/components/pages/Register";
import Rides from "./components/pages/Rides";

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rides" element={<Rides />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
