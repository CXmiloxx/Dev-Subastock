import BotonVolver from "../UI/BotonVolver";
import ListVisualizarAnimalesSubasta from "./ListVisualizarAnimalesSubasta";

export default function VisualizarAnimalesSubasta() {
  return (
    <div>
      <BotonVolver ruta={'/sesion-iniciada'}/>
      <div>
        <ListVisualizarAnimalesSubasta/>
      </div>
    </div>
  )
}
