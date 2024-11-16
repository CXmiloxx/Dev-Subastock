import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const BotonesAutenticacion = ({
  registrarseClassName,
  iniciarSesionClassName,
  className = "",
}) => {
  return (
    <>
      <Link to='/registro' style={{textDecoration: "none"}}>
        <button className={className + " " + registrarseClassName}>
          Registrarse
        </button>
      </Link>

      <Link to='/login' style={{textDecoration: "none"}}>
        <button className={className + " " + iniciarSesionClassName}>
          Iniciar Sesion
        </button>
      </Link>

    </>
  );
};

export default BotonesAutenticacion;
