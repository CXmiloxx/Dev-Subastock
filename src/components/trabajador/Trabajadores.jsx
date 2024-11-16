import { useState, useEffect } from 'react';
import styles from './styles/Trabajadores.module.css';

export default function Trabajadores() {
    const [datos, setDatos] = useState([]);

    const fetchTrabajadores = async () => {
        const idUsuario = localStorage.getItem('idUsuario');
        if (idUsuario) {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + `/trabajador/Obtener/${idUsuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status) {
                    setDatos(data.data.trabajadores);
                } else {
                    console.error('Error:', data.message);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('No hay un usuario logueado');
            setDatos([]);
        }
    };

    useEffect(() => {
        fetchTrabajadores();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Trabajadores</h1>
            <p>Aquí podrás encontrar la información de los trabajadores de la empresa.</p>
            <div className={styles.cardContainer}>
                {datos.map((trabajador, index) => (
                    <div key={trabajador.idTrabajador || index} className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3>{trabajador.nombres} {trabajador.apellidos}</h3>
                            <p><strong>Correo:</strong> {trabajador.correo}</p>
                            <p><strong>Rol:</strong> {trabajador.rol}</p>
                            <p><strong>Contraseña:</strong> {trabajador.contraseña}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
