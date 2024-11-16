import RegistrarTrabajador from "../../components/trabajador/RegistrarTrabajador";
import Trabajadores from "../../components/trabajador/Trabajadores";

export default function DashBoard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Bienvenido a su panel de control</h2>
            <h3>Aquí podrá visualizar, editar y eliminar todos sus animales</h3>

            <div>
                <RegistrarTrabajador/>
            </div>

            <div>
                <Trabajadores/>
            </div>
        </div>
    )
}
