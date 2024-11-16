import { useState, useEffect } from "react";
import bovino from "../../pages/Animales/img/Bovino.png";
import porcino from "../../pages/Animales/img/Porcino.png";
import caprino from "../../pages/Animales/img/Caprino.png";
import equino from "../../pages/Animales/img/Equino.png";
import notFound from "../../pages/Animales/img/Notfount.png";
import apino from "../../pages/Animales/img/Apino.png";
import CardAnimalesSubastas from "./CardAnimalesSubastas";
import SPLoader from "../../pages/loader/Loader";

const especieToImageMap = {
    Bovino: bovino,
    Porcino: porcino,
    Caprino: caprino,
    Equino: equino,
    Avicultura: apino,
    default: notFound,
};

export default function ListVisualizarAnimalesSubasta() {
    const [animales, setAnimales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const idUsuario = localStorage.getItem('idUsuario');
        if (idUsuario) {
            const fetchData = async () => {
                try {
                    const subastaResponse = await fetch(import.meta.env.VITE_API_URL + `/subasta/Obtener`,
                        {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                        }
                    );

                    if (!subastaResponse.ok) throw new Error(`Error en subasta: ${subastaResponse.status}`);
                    const subastaData = await subastaResponse.json();
                    const subastasActivas = subastaData.status
                        ? subastaData.subastas.map((subasta) => subasta.idAnimal)
                        : [];

                    const animalResponse = await fetch(import.meta.env.VITE_API_URL + `/animal/Obtener/${idUsuario}`,
                        {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                        }
                    );

                    if (!animalResponse.ok) throw new Error(`Error en animales: ${animalResponse.status}`);
                    const animalData = await animalResponse.json();

                    const animalesDisponibles = animalData.status
                        ? animalData.animal.filter((animal) => !subastasActivas.includes(animal.idAnimal))
                        : [];

                    setAnimales(animalesDisponibles);
                } catch (error) {
                    console.error("Error al obtener datos:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        } else {
            setIsLoading(false);
        }
    }, []);

    const cards = animales.map((animal) => (
        <CardAnimalesSubastas
            key={animal.idAnimal}
            visualizarAnimal={animal}
            imagen={especieToImageMap[animal.especie] || especieToImageMap.default}
        />
    ));

    if (isLoading) {
        return <SPLoader />;
    }

    return (
        <div style={styles.contendCards}>
            {animales.length > 0 ? (
                <>
                    <h1 style={styles.title}>Mis Animales</h1>
                    <div style={styles.containerCards}>{cards}</div>
                </>
            ) : (
                <h1 style={styles.title}>No hay animales disponibles para subastar.</h1>
            )}
        </div>
    );
}

const styles = {
    contendCards: {
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
    },
    title: {
        fontSize: "28px",
        marginBottom: "30px",
        textAlign: "center",
        color: "#5cb90c",
        fontWeight: "bold",
        backgroundColor: "#f2f2f2",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(100, 129, 55, 0.25)",
    },
    containerCards: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "30px",
        padding: "20px",
    },
};
