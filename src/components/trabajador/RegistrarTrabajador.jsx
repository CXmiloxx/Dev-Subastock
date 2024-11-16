import { useState } from "react";
import styles from "./styles/RegistrarTrabajador.module.css";

export default function RegistrarTrabajador() {
    const [values, setValues] = useState({
        nombres: '',
        apellidos: '',
        rol: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idUsuario = localStorage.getItem('idUsuario');
        if (idUsuario) {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + `/trabajador/Insertar/${idUsuario}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                if (data.status) {
                    alert('Trabajador registrado correctamente');
                    setValues({ nombres: '', apellidos: '', rol: '' });
                } else {
                    alert('Hubo un error al registrar el trabajador: ' + data.message);
                }
            } catch (error) {
                console.error('Error al registrar al trabajador:', error);
            }
        } else {
            alert('Debes estar logueado para registrar un trabajador');
        }
    };

    return (
        <div className={styles.containerRegistro}>
            <h2>Registrar Trabajador</h2>
            <form className={styles.formRegistro} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="nombres">Nombre</label>
                    <input
                        type="text"
                        id="nombres"
                        name="nombres"
                        value={values.nombres}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="apellidos">Apellido</label>
                    <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        value={values.apellidos}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="rol">Rol</label>
                    <select
                        id="rol"
                        name="rol"
                        value={values.rol}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="empleado">Empleado</option>
                    </select>
                </div>

                <button type="submit" className={styles.botonRegistrar}>
                    Registrar
                </button>
            </form>
        </div>
    );
}
