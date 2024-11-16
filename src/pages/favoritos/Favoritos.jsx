import { useEffect, useState } from 'react';
import Tarjeta from '../../components/Subastas/Tarjeta'; 
import styles from './favoritos.module.css'

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [idUsuario, setIdUsuario] = useState(''); 

    // session storage
    useEffect(() => {
        const storedIdUsuario = sessionStorage.getItem('idUsuario');
        if (storedIdUsuario) {
            setIdUsuario(storedIdUsuario);
            console.log("ID del usuario desde sessionStorage:", storedIdUsuario);
        } else {
            console.warn("El usuario no ha iniciado sesión.");
        }
    }, []);

    // Hacer la petición solo si el idUsuario es válido
    useEffect(() => {
        if (!idUsuario) return;

        const fetchFavoritos = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL+`/favorito/Obtener/${idUsuario}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!response.ok) throw new Error("No se pudieron obtener los favoritos");

                const data = await response.json();
                
                // id subastas
                const subastaIds = data.Favoritos.map(favorito => favorito.idSubasta);

                // 
                const respSubasta = await fetch(
                    `https://apisubastock.cleverapps.io/subasta/Obtener`, 
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!respSubasta.ok) throw new Error("No se pudieron obtener las subastas");

                const subastasData = await respSubasta.json();
                const subastas = subastasData.subastas || [];

                // Filtrar las subastas para obtener solo las favoritas
                const favoritasConDetalles = subastas.filter(subasta => 
                    subastaIds.includes(subasta.idSubasta)
                );

                setFavoritos(favoritasConDetalles);
            } catch (error) {
                console.error("Error al obtener los favoritos o las subastas:", error);
            }
        };

        fetchFavoritos();
    }, [idUsuario]);

    return (
        <div className="container">
            <p className={styles.titulo}>FAVORITOS</p>
            <div className={styles.containerLg}>
                {favoritos.length > 0 ? (
                    favoritos.map((subasta) => (
                        <Tarjeta
                            key={subasta.idSubasta}
                            idSubasta={subasta.idSubasta}
                            fechaFin={subasta.fechaFin}
                            tituloSubasta={subasta.tituloSubasta}
                            imagenUrl={subasta.imagenUrl}
                            imagenUrl2={subasta.imagenUrl2}
                            imagenUrl3={subasta.imagenUrl3}
                            imagenUrl4={subasta.imagenUrl4}
                            imagenUrl5={subasta.imagenUrl5}
                        />
                    ))
                ) : (
                    <p>No tienes subastas marcadas como favoritas.</p>
                )}
            </div>
        </div>
    );
};

export default Favoritos;
