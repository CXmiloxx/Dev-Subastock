import { useEffect, useState } from "react";
import CardTiposEspecie from "./CardTiposEspecie";
import bovino from './img/Bovino.png';
import porcino from './img/Porcino.png';
import caprino from './img/Caprino.png';
import equino from './img/Equino.png';
import apino from './img/Apino.png';
import notFount from './img/Notfount.png';
import SPLoader from '../loader/Loader';

const imageMapEspecies = {
    "Bovino": bovino,
    "Porcino": porcino,
    "Caprino": caprino,
    "Equino": equino,
    "Avicultura": apino,
    "default": notFount
};

export default function ListTipoEspecie() {
    const [especies, setEspecies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [animalesSubastados, setAnimalesSubastados] = useState([]);

    const obtenerAnimalesSubastados = async () => {
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
                setAnimalesSubastados(data.data.subastas.map(subasta => subasta.idAnimal));
            }
        } catch (error) {
            console.error('Error al obtener los animales subastados:', error);
        }
    };

    const obtenerEspeciesNoSubastadas = async () => {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) return;

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/animal/Obtener/${idUsuario}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status) {
                const especiesFiltradas = {};

                data.data.animal.forEach(animal => {
                    if (!animalesSubastados.includes(animal.idAnimal)) {
                        if (!especiesFiltradas[animal.especie]) {
                            especiesFiltradas[animal.especie] = [];
                        }
                        especiesFiltradas[animal.especie].push(animal);
                    }
                });

                setEspecies(Object.keys(especiesFiltradas).map(especie => ({
                    especie,
                    animales: especiesFiltradas[especie]
                })));
            }
        } catch (error) {
            console.error('Error al obtener las especies:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        obtenerAnimalesSubastados();
    }, []);

    useEffect(() => {
        if (animalesSubastados.length > 0) {
            obtenerEspeciesNoSubastadas();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animalesSubastados]);

    const cards = especies.map((especie) => (
        <CardTiposEspecie
            key={especie.especie}
            tipoEspecie={especie}
            imagen={imageMapEspecies[especie.especie] || imageMapEspecies["default"]}
        />
    ));

    if (isLoading) {
        return <SPLoader />
    }

    return (
        <div style={styles.containerPrincipal}>
            {especies.length > 0 ? (
                <>
                    <h1 style={styles.tituloAnimales}>Tipos de especie</h1>
                    <div style={styles.containerCards}>{cards}</div>
                </>
            ) : (
                <h1 style={styles.tituloAnimales}>No hay animales registrados.</h1>
            )}
        </div>
    );
}

const styles = {
    containerPrincipal: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    tituloAnimales: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#5cb90c',
        fontWeight: 'bold',
        backgroundColor: '#f2f2f2',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    containerCards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
};
