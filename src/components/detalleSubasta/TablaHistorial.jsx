/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./detalleSubasta.module.css";

export function TablaHistorial({ idAnimal }) {
  const [pujas, setPujas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerHistorialPujas = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          `https://apisubastock.cleverapps.io/subasta/PujasPorAnimal/${idAnimal}`
        );
        const data = await response.json();

        if (data.status) {
          setPujas(data.data.pujas);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };

    if (idAnimal) {
      obtenerHistorialPujas();
    }
  }, [idAnimal]);

  return (
    <div className={`${styles.historialContainer} container-md my-4`}>
      <div className={`${styles.historialHeader} mb-3`}>
        <h3>📜 Historial de Pujas</h3>
      </div>
      {cargando ? (
        <p className={styles.cargando}>Cargando...</p>
      ) : (
        <div className="table-responsive">
          <table className={`table text-center ${styles.historialTable}`}>
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              {pujas.length > 0 ? (
                pujas.map((puja, index) => (
                  <tr key={index}>
                    <td>{`${puja.nombres.charAt(0)}***${puja.apellidos.charAt(0)}`}</td>
                    <td>
                      {parseFloat(puja.valor).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No se encontraron pujas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
