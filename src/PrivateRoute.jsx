/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "./contexts/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { isLogged, isLoading } = useAuth();

  // Si todavía está cargando, puedes renderizar un componente de carga
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si el usuario no está autenticado, redirige a la página de login
  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, renderiza el componente
  return element;
};

export default PrivateRoute;
