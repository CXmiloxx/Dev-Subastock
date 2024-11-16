import { useEffect, useState } from "react";
import Tarjeta from "../../components/Subastas/Tarjeta";


const Subastas = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/subasta/Obtener")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  const subastas = data.subastas || [];

  if (subastas.length === 0) {
    return null;
  }

  return (
    <div
      className="container-lg"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 20,

        padding:
          "calc(var(--header-height) + 30px + 16px) 20px calc(var(--footer-height) + 30px + 16px) 20px",
        minHeight: "100svh",
        boxSizing: "border-box",
        marginTop: 100,
      }}
    >
      {subastas.map((subasta) => (
        <Tarjeta {...subasta} key={subasta.idSubasta} />
      ))}
    </div>
  );
};

export default Subastas;
