import { Routes, Route, HashRouter } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Layout from "./components/Layout/Layout";
import Inicio from './App.jsx';
import Registro from "./pages/Registro/Registro.jsx";
import { DetalleSubasta } from "./components/detalleSubasta/DetalleSubasta";
import VisualizarAnimal from "./pages/VisualizarAnimales/VisualizarAnimal";
import { Subastar } from "./components/subastar/Subastar.jsx";
import RegistroAnimales from "./pages/RegistroAnimales/RegistroAnimales.jsx";
import Animales from "./pages/Animales/Animales";
import Crud from "./pages/CRUD-xime/Crud.jsx";
import VisualizarAnimalesSubasta from "./components/subastar/VisualizarAnimalesSubasta.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Subastas from "./pages/Subastas/Subastas.jsx";
import Favoritos from "./pages/favoritos/Favoritos.jsx";
import SesionIniciada from "./pages/SesionIniciada/SesionIniciada.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import DashBoard from "./pages/dashboard/DashBoard.jsx";

export default function AppRouter() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          
          {/* Rutas con Layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

            <Route index element={<Inicio />} />
            <Route path="/detalle-subasta/:idSubasta" element={<DetalleSubasta />} />

            {/*rutas privadas*/}
            <Route path="/sesion-iniciada" element={<PrivateRoute element={<SesionIniciada />} />} />
            <Route path="/dashboard" element={<PrivateRoute element={<DashBoard />} />} />
            <Route path="/registro-animales" element={<PrivateRoute element={<RegistroAnimales />} />} />
            <Route path="/ver-animales" element={<PrivateRoute element={<Animales />} />} />
            <Route path="/visualizar/:tipoAnimal" element={<PrivateRoute element={<VisualizarAnimal />} />} />
            <Route path="/crud-animal/:idAnimal" element={<PrivateRoute element={<Crud />} />} />
            <Route path="/subastar" element={<PrivateRoute element={<VisualizarAnimalesSubasta />} />} />
            <Route path="/subastar/:idAnimal" element={<PrivateRoute element={<Subastar />} />} />
            <Route path="/favoritos" element={<PrivateRoute element={<Favoritos />} />} />
            <Route path="/subastas" element={<PrivateRoute element={<Subastas />} />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
