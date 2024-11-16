import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardVisualizarAnimal from "./CardVisualizarAnimal";
import bovino from '../Animales/img/Bovino.png';
import porcino from '../Animales/img/Porcino.png';
import notFount from '../Animales/img/Notfount.png';
import caprino from '../Animales/img/Caprino.png';
import equino from '../Animales/img/Equino.png';
import apino from '../Animales/img/Apino.png';
import SPLoader from "../loader/Loader";

export default function ListVisualizarAnimal() {
    const [animales, setAnimales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { tipoAnimal } = useParams();
    const [animalesSubastados, setAnimalesSubastados] = useState([]);

    const especieToImageMap = {
        "Bovino": bovino,
        "Porcino": porcino,
        "Caprino": caprino,
        "Equino": equino,
        "Avicultura": apino,
        "default": notFount
    };

    useEffect(() => {
        const fetchAnimales = async () => {
            if (animalesSubastados.length === 0) return;

            const idUsuario = localStorage.getItem('idUsuario');
            if (!idUsuario) return;

            setIsLoading(true);
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/animal/Obtener/${idUsuario}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                if (data.status) {
                    const dataAnimales = data.data.animal;

                    const animalesFiltrados = dataAnimales.filter(animal =>
                        animal.especie.toLowerCase() === tipoAnimal.toLowerCase() &&
                        !animalesSubastados.some(subastado => subastado.idAnimal === animal.idAnimal)
                    );
                    setAnimales(animalesFiltrados);
                }
            } catch (error) {
                console.error("Error al obtener los animales:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimales();
    }, [tipoAnimal, animalesSubastados]);

    const animalSubastado = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/subasta/Obtener`,
                { method: 'GET', headers: { 'Content-Type': 'application/json' } }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status) {
                setAnimalesSubastados(data.data.subastas);
            }

        } catch (error) {
            console.error('Error al obtener si el animal está subastado:', error);
        }
    };

    useEffect(() => {
        animalSubastado();
    }, []);

    if (isLoading) {
        return <SPLoader />;
    }

    return (
        <div style={styles.contendCards}>
            {animales.length > 0 ? (
                <>
                    <h1 style={styles.title}>Animales de la raza {tipoAnimal}</h1>
                    <div style={styles.containerCards}>
                        {animales.map((animal) => (
                            <CardVisualizarAnimal
                                key={animal.idAnimal}
                                visualizarAnimal={animal}
                                imagen={especieToImageMap[animal.especie] || especieToImageMap["default"]}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <h1 style={styles.title}>No hay animales registrados de este tipo.</h1>
            )}
        </div>
    );
}

const styles = {
    contendCards: {
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    title: {
        fontSize: '28px',
        marginBottom: '30px',
        textAlign: 'center',
        color: '#5cb90c',
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(100, 129, 55, 0.25)',
    },
    containerCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
        padding: '20px',
    },
};
