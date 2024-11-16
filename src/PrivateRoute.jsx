/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "./contexts/AuthContext";
import Loader from "./pages/loader/Loader";

const PrivateRoute = ({ element, ...rest }) => {
  const { isLogged, isLoading } = useAuth();

  if (isLoading) {
    return <div>
      <Loader/>
    </div>;
  }

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
