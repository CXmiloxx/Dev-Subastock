import { useState } from "react";
export default function RegistrarTrabajador() {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [rol, setRol] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombres || !apellidos || !rol) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const datosTrabajador = {
            nombres,
            apellidos,
            rol,
        };
        const idUsuario = localStorage.getItem('idUsuario');
        if(idUsuario){
        try {
            const response = await fetch( import.meta.env.VITE_API_URL + `/trabajador/Insertar/${idUsuario}`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosTrabajador),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            
            if (data.status) {
                alert('Trabajador registrado correctamente');
                setNombres('');
                setApellidos('');
                setRol('');
            }else{
                alert('Hubo un error al registrar el trabajador' . data.message);

            }
        } catch (error) {
            console.error('Error al registrar al trabajador:', error);
        }
    }else{
        alert('Debes estar logueado para registrar un trabajador');
    
    }
    };

    return (
        <div>
            <h2>Registrar Trabajador</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombres">Nombre</label>
                    <input
                        type="text"
                        id="nombres"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="apellidos">Apellido</label>
                    <input
                        type="text"
                        id="apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rol">Rol</label>
                    <select
                        id="rol"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="admin">Administrador</option>
                        <option value="empleado">Empleado</option>
                    </select>
                </div>

                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}
