
import BotonVolver from "../../components/UI/BotonVolver"
import ListTipoEspecie from "./ListTipoEspecie"

export default function Animales() {
    return (
        <div>
            <div>
                <BotonVolver ruta={'/sesion-iniciada'}/>
            </div>
            <div>
                <ListTipoEspecie/>
            </div>
        </div>
    )
}

