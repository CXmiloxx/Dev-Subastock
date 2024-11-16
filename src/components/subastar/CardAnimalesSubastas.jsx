/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../pages/VisualizarAnimales/styles/VisualizarAnimales.module.css"
export default function CardAnimalesSubastas({ visualizarAnimal, imagen }) {
    const handleVisualizarClick = () => {
        localStorage.setItem('idAnimal', visualizarAnimal.idAnimal);
        localStorage.setItem('marca', visualizarAnimal.marca);
    };
    return (
        <div>
            <div className={styles.containerPrincipal}>
                <div className={styles.imgContainerTipo}>
                    <img
                        className={styles.cardImage}
                        src={imagen}
                        alt={visualizarAnimal.raza}
                    />
                </div>
                <div className={styles.contentTipo} >
                    <h5 className={styles.cardName}>raza : {visualizarAnimal.raza}</h5>
                    <h6>Marca: {visualizarAnimal.marca}</h6>
                    <Link
                        to={`/subastar/${visualizarAnimal.idAnimal}`}
                        onClick={handleVisualizarClick}
                    >
                        <button className={styles.btnVisualizar}>Subastar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
