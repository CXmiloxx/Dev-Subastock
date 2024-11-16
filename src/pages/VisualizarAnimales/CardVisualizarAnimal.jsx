/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./styles/VisualizarAnimales.module.css";

export default function CardVisualizarAnimal({ visualizarAnimal, imagen }) {
    const handleVisualizarClick = () => {
        localStorage.setItem("marcaAnimal", visualizarAnimal.marca);
        localStorage.setItem("idAnimal", visualizarAnimal.idAnimal);
        localStorage.setItem("razaAnimal", visualizarAnimal.raza);
    };

    return (
        <div className={styles.containerPrincipal}>
            <Link
                to={`/crud-animal/${visualizarAnimal.idAnimal}`}
                onClick={handleVisualizarClick}
                className={styles.animalLink}
            >
                <div className={styles.imgContainerTipo}>
                    <img
                        className={styles.cardImage}
                        src={imagen}
                        alt={visualizarAnimal.raza}
                    />
                </div>
                <div className={styles.contentTipo}>
                    <h5 className={styles.cardName}>
                        Raza <span className={styles.value}>{visualizarAnimal.raza}</span>
                    </h5>
                    <h6 className={styles.cardDetails}>
                        Marca <span className={styles.value}>{visualizarAnimal.marca}</span>
                    </h6>
                    <button className={styles.btnVisualizar}>Visualizar</button>
                </div>
            </Link>
        </div>
    );
}
