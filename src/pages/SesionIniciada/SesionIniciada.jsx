import { Link } from "react-router-dom";
import styles from "./sesionIniciada.module.css";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";

function SesionIniciada() {
    const { userData, userRole } = useAuth();
    const [idUsuario, setIdUsuario] = useState(null);

    useEffect(() => {
        if (userData?.data?.id && idUsuario === null) {
            const usuarioId = userData.data.id;
            setIdUsuario(usuarioId);
            localStorage.setItem("idUsuario", usuarioId);
        }
    }, [userData, idUsuario]);


    const opcionesTrabajador = (
        <div className={styles.buttonContainer}>
            <h1 className={styles.centeredTitle}>BIENVENIDO A SUBASTOCK</h1>
            <Link to="/ver-animales">
                <button className={styles.button}>VER ANIMALES</button>
            </Link>
            <Link to="/registro-animales">
                <button className={styles.button}>REGISTRAR ANIMALES</button>
            </Link>
        </div>
    );

    const opcionesAdministrador = (
        <div className={styles.buttonContainer}>
            <h1 className={styles.centeredTitle}>BIENVENIDO A SUBASTOCK</h1>
            <Link to="/Subastar">
                <button className={styles.button}>SUBASTAR</button>
            </Link>
            <Link to="/dashboard">
                <button className={styles.button}>TRABAJADORES</button>
            </Link>
            <Link to="/favoritos">
                <button className={styles.button}>FAVORITOS</button>
            </Link>
            <Link to="/registro-animales">
                <button className={styles.button}>REGISTRAR ANIMAL</button>
            </Link>
            <Link to="/ver-animales">
                <button className={styles.button}>VER ANIMALES</button>
            </Link>
        </div>
    );

    return (
        <div className={styles.sesionContainer}>
            <div className={styles.contentContainer}>
                {userRole ?  opcionesTrabajador : opcionesAdministrador}
            </div>
        </div>
    );
}

export default SesionIniciada;
