/* eslint-disable react/prop-types */
import LazyCarousel from "./LazyCarousel";
import { useState, useEffect } from "react";
import Temporizador from "./Temporizador";
import { Link } from "react-router-dom";

const Tarjeta = ({
  idSubasta,
  fechaFin,
  tituloSubasta,
  imagenUrl,
  imagenUrl2,
  imagenUrl3,
  imagenUrl4,
  imagenUrl5,
  pujaMinima
  
}) => {
  const [esTiempoCritico, setTiempoCritico] = useState(false);
  const [esFavorito, setEsFavorito] = useState(false);
  const [idUsuario, setIdUsuario] = useState('');
  const [maxPuja, setMaxPuja] = useState(0);
  
  useEffect(() => {
    const storedIdUsuario = localStorage.getItem('idUsuario');
    if (storedIdUsuario) {
      setIdUsuario(storedIdUsuario);
    }
  }, []);

  useEffect(() => {
    if (!idUsuario) return;

    const fetchObtener = async () => {
      try {
        const response = await fetch(
          `https://apisubastock.cleverapps.io/favorito/Obtener/${idUsuario}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) throw new Error("No se pudo obtener la subasta");

        const data = await response.json();
        const favoritos = data.Favoritos || [];
        const favorito = favoritos.some((fav) => fav.idSubasta === idSubasta);

        setEsFavorito(favorito);
      } catch (error) {
        console.error("Error al obtener favoritos:", error);
      }
    };

    fetchObtener();
  }, [idUsuario, idSubasta]);

  const toggleFavorito = async () => {
    const nuevoEstadoFavorito = !esFavorito;
    setEsFavorito(nuevoEstadoFavorito);

    try {
      const url = `https://apisubastock.cleverapps.io/favorito/${nuevoEstadoFavorito ? 'Insertar' : 'Eliminar'}/${idSubasta}`;
      if (nuevoEstadoFavorito) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idSubasta, idUsuario }),
        });
        if (!response.ok) throw new Error(`No se pudo agregar el favorito`);

        const data = await response.json();
        if (data.status) {
          console.log(data.message);
        }
      } else {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idUsuario }),
        });
        if (!response.ok) throw new Error(`No se pudo eliminar el favorito`);

        const data = await response.json();
        if (data.status) {
          console.log(data.message);
        }
      }
    } catch (error) {
      console.error("Error al manejar favorito:", error);
      setEsFavorito(!nuevoEstadoFavorito);
    }
  };

  useEffect(() => {
    const obtenerPujas = async () => {
      try {
        const response = await fetch(`https://apisubastock.cleverapps.io/puja/Obtener`);
        const data = await response.json();
        if (!data.status) {
          console.error("Error al obtener las pujas:", data.message);
          return;
        }

        // Filtrar las pujas para la subasta específica
        const pujas = data.data.pujas.filter(puja => puja.idSubasta === idSubasta);
        if (pujas.length > 0) {
          const maxValor = Math.max(...pujas.map(puja => parseFloat(puja.valor)));
          setMaxPuja(maxValor);
        } else {
          setMaxPuja(pujaMinima);
        }
      } catch (error) {
        console.error("Error al obtener las pujas:", error);
      }
    };

    obtenerPujas();
  }, [idSubasta, pujaMinima]);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
      className="d-flex flex-column"
    >
      <Link to={`/detalle-subasta/${idSubasta}`} style={{ textDecoration: "none", color: "inherit" }}>
        <LazyCarousel
          imgs={[imagenUrl, imagenUrl2, imagenUrl3, imagenUrl4, imagenUrl5].filter((img) => img !== null)}
        />
      </Link>

      <div className="p-3 d-flex flex-column gap-2">
        <Link to={`/detalle-subasta/${idSubasta}`} style={{ textDecoration: "none", color: "inherit" }}>
          <span className="fs-4 text-bold">{tituloSubasta}</span>
        </Link>

        <span
          className="badge rounded-pill"
          style={{
            backgroundColor: esTiempoCritico ? "#ff0000" : "var(--primary-color)",
            width: "fit-content",
          }}
        >
          Cierra en&nbsp;
          <Temporizador
            fechaFin={fechaFin}
            onTiempoCritico={() => setTiempoCritico(true)}
            minutosCriticos={5}
          />
        </span>

        <div className="my-1 d-flex flex-wrap flex-column gap-1">
          <div className="ubicacionDetalles d-flex gap-2 align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="var(--primary-color)"
              className="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>
            <span className="fs-5">
              Colombia
              <span
                onClick={toggleFavorito}
                style={{ cursor: "pointer", fontSize: "1.5rem", marginLeft: '10px' }}
              >
                {esFavorito ? "★" : "☆"}
              </span>
            </span>
          </div>
        </div>
        <div className="subastasDetalles d-flex gap-2 align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="var(--primary-color)"
            className="bi bi-people-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
          </svg>
          <span className="fs-5">{Math.floor(Math.random() * 30 + 1)}</span>
        </div>
      </div>
      <hr style={{ height: 2 }} />

      <div className="detallesPuja px-3 d-flex flex-column">
        <span style={{ fontFamily: "0.9rem", color: "#00000095" }}>
          Puja más alta:{" "}
        </span>
        <span className="fs-4" style={{ fontWeight: "bold" }}>
          {maxPuja ? `COP ${maxPuja.toLocaleString('es-CO', {
            minimumFractionDigits: 0,
          })}` : "0"}
        </span>
      </div>
    </div>
  );
};

export default Tarjeta;

