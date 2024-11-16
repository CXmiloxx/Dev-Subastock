/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from './styles/Historiales.module.css';

export default function HistorialAlimento() {
    const [idAnimal, setIdAnimal] = useState('');
    const [marca, setMarca] = useState('');
    const [historial, setHistorial] = useState([]);

    useEffect(() => {
        const storedIdAnimal = localStorage.getItem('idAnimal');
        if (storedIdAnimal) setIdAnimal(storedIdAnimal);

        const storedMarca = localStorage.getItem('marcaAnimal');
        if (storedMarca) setMarca(storedMarca);
    }, []);

    const fetchHistorial = async () => {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL +`/alimentacion/Obtener/${idAnimal}`,
                { method: 'GET', headers: { 'Content-Type': 'application/json' } }
            );
            const data = await response.json();

            if (data.status) {
                setHistorial(data.data.alimentos);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        }
    };

    const eliminarAlimento = async (idAlimentacion) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro de eliminar este alimento?',
                text: 'Una vez eliminado, no se podrá recuperar!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!',
            });

            if (result.isConfirmed) {
                const response = await fetch(
                    import.meta.env.VITE_API_URL`/alimentacion/Eliminar/${idAlimentacion}`,
                    { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
                );
                const data = await response.json();

                if (data.status) {
                    Swal.fire('Eliminado!', 'El alimento ha sido eliminado.', 'success');
                    setHistorial((prevHistorial) =>
                        prevHistorial.filter((alimento) => alimento.idAlimentacion !== idAlimentacion)
                    );
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al eliminar el alimento.',
            });
        }
    };

    useEffect(() => {
        if (idAnimal) fetchHistorial();
    }, [idAnimal]);

    return (
    <div className={styles.historialContainer}>
        <h1 className={styles.historialTitle}>Historial de Alimentos - {marca}</h1>
        <div className={styles.tableWrapper}>
            <table className={styles.historialTable}>
                <thead>
                    <tr>
                        <th>Tipo de Alimento</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.length > 0 ? (
                        historial.map((alimento) => (
                            <tr key={alimento.idAlimentacion}>
                                <td>{alimento.tipo_alimento}</td>
                                <td>{alimento.cantidad} Kl</td>
                                <td>{alimento.fecha}</td>
                                <td>
                                    <button
                                        className={styles.btnEliminar}
                                        onClick={() => eliminarAlimento(alimento.idAlimentacion)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className={styles.noData}>
                                No hay datos para mostrar
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

}
