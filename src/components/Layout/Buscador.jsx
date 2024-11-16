import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from './Buscador.module.css';

const Buscador = () => {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [animales, setAnimales] = useState([]);
  const [error, setError] = useState('');

  const buscar = useCallback((query) => {
    const currentIdUsuario = localStorage.getItem("idUsuario") || "";
    if (!query.trim() || !currentIdUsuario) {
      setAnimales([]);
      return;
    }

    fetch(import.meta.env.VITE_API_URL + `/buscador/Buscar/${currentIdUsuario}/${query}`)
      .then((response) => response.json())
      .then((data) => {
        setAnimales(data.data.animal || []);
        setError('');
      })
      .catch((error) => {
        console.error("Error al buscar animales:", error);
        setAnimales([]);
        setError("No se pudo realizar la búsqueda. Intenta de nuevo.");
      });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      buscar(textoBusqueda);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [buscar, textoBusqueda]);

  const handleAnimalClick = (idAnimal, marca, raza) => {
    setTextoBusqueda("");
    setAnimales([]);
    localStorage.setItem('idAnimal', idAnimal);
    localStorage.setItem('marcaAnimal', marca);
    localStorage.setItem('razaAnimal', raza);
  };

  return (
    <div style={{ position: "relative", width: "290px" }}>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      <div
        className="input-group rounded-pill d-sm-flex"
        id="buscador"
        style={{
          backgroundColor: "#E5E4E270",
          height: "32px",
          width: "100%",
        }}
      >
        <input
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscar(textoBusqueda)}
          className="form-control border-0 rounded-pill shadow-none bg-transparent"
          style={{ padding: "0 0 0 20px", margin: 0, height: "100%" }}
          type="text"
          placeholder="Buscar animal..."
        />
        <div
          className="input-group-text bg-transparent border-0 pointer-click"
          role="button"
          onClick={() => buscar(textoBusqueda)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#237E0D"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>

      {animales.length > 0 && (
        <div className={styles.resultadosBusqueda}>
          {animales.map((animal) => (
            <Link
              key={animal.idAnimal}
              to={`/crud-animal/${animal.idAnimal}`}
              className={styles.resultadoItemLink}
              onClick={() => handleAnimalClick(animal.idAnimal, animal.marca, animal.raza)}
            >
              <div className={styles.resultadoItem}>
                <h5>{animal.raza} - {animal.marca}</h5>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Buscador;
