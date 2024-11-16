import styles from "./styles/subastar.module.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BotonVolver from "../UI/BotonVolver";
import SPLoader from "../../pages/loader/Loader";

export function Subastar() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [idUsuario, setIdUsuario] = useState("");
  const [idAnimal, setIdAnimal] = useState("");
  const [marca, setMarca] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [imagenPreviews, setImagenPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedIdUsuario = localStorage.getItem("idUsuario");
    const storedMarca = localStorage.getItem("marca");
    const storedIdAnimal = localStorage.getItem("idAnimal");

    if (storedIdUsuario) setIdUsuario(storedIdUsuario);
    if (storedMarca) setMarca(storedMarca);
    if (storedIdAnimal) setIdAnimal(storedIdAnimal);
  }, []);

  const [values, setValues] = useState({
    pujaMinima: "",
    fechaInicio: "",
    fechaFin: "",
    tituloSubasta: "",
    descripcion: "",
  });

  useEffect(() => {
    setValues((prev) => ({ ...prev, idUsuario, idAnimal }));
  }, [idUsuario, idAnimal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + imagenes.length > 5) {
      Swal.fire({
        title: "Límite de imágenes superado",
        text: "Solo puedes subir un máximo de 5 imágenes.",
        icon: "warning",
      });
      return;
    }

    setImagenes((prev) => [...prev, ...files]);

    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setImagenPreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));

    imagenes.forEach((img, index) =>
      formData.append(index === 0 ? "imagen" : `imagen${index}`, img)
    );

    fetch(`${API_URL}/subasta/Insertar/${idAnimal}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        Swal.fire({
          title: data.status ? "Subasta Creada con Éxito" : "Error",
          text: data.message || "",
          icon: data.status ? "success" : "error",
          showCancelButton: false,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed && data.status) {
            navigate("/sesion-iniciada");
          }
        });
      })
      .catch((err) =>
        Swal.fire({
          title: "Error al crear la subasta",
          text: err.message,
          icon: "error",
        })
      )
      .finally(() => setLoading(false));
  };

  const limpiar = () => {
    if (imagenes.length === 0) {
      Swal.fire("Nada que limpiar", "No hay imágenes seleccionadas", "info");
    } else {
      setImagenes([]);
      setImagenPreviews([]);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <SPLoader />
      ) :
        (
          <>
            <BotonVolver ruta={"/sesion-iniciada"} />
            <h2 className={styles.title}>Subastar Animal con Marca: {marca}</h2><div className={styles.content}>
              <div className={styles.leftContainer}>
                <label className={styles.label}>Selecciona hasta 5 imágenes:</label>
                <label> imagenes seleccionada : {imagenes.length} </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput} />
                <button onClick={limpiar} className={styles.clearButton}>
                  Limpiar Imágenes
                </button>

                <div className={styles.imageCarousel}>
                  {imagenPreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Imagen ${idx + 1}`}
                      className={styles.image} />
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  required
                  name="tituloSubasta"
                  placeholder="Nombre de la Subasta"
                  onChange={handleChange}
                  className={styles.input} />
                <textarea
                  name="descripcion"
                  required
                  rows="3"
                  placeholder="Descripción de la Subasta"
                  onChange={handleChange}
                  className={styles.input} />
                <div className={styles.dateFields}>
                  <input
                    type="datetime-local"
                    name="fechaInicio"
                    required
                    onChange={handleChange}
                    className={styles.dateInput} />
                  <input
                    type="datetime-local"
                    name="fechaFin"
                    required
                    onChange={handleChange}
                    className={styles.dateInput} />
                </div>
                <input
                  type="number"
                  name="pujaMinima"
                  required
                  placeholder="Puja Mínima"
                  onChange={handleChange}
                  className={styles.input} />
                <button type="submit" className={styles.submitButton}>
                  Subastar
                </button>
              </form>
            </div>
            </>
        )}
    </div>
  );
}
