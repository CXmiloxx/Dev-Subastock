import RegistrarTrabajador from "../../components/trabajador/RegistrarTrabajador";
import Trabajadores from "../../components/trabajador/Trabajadores";

export default function DashBoard() {
    return (
        <div>
                <h1>Clientes </h1>
            <div>
                <RegistrarTrabajador/>
            </div>
            <hr />
            <div>
                <Trabajadores/>
            </div>
        </div>
    )
}
