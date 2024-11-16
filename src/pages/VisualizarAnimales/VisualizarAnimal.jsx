import BotonVolver from "../../components/UI/BotonVolver";
import ListVisualizarAnimal from "./ListVisualizarAnimal";

export default function VisualizarAnimal() {
    return (
        <div>
            <div>
                <BotonVolver ruta={'/ver-animales'} />
            </div>
            <div>
                <ListVisualizarAnimal />
            </div>
        </div>
    );
}
