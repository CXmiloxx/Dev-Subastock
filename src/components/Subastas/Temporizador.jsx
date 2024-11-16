/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";

const Temporizador = ({ fechaFin, onTiempoCritico, minutosCriticos = 1 }) => {
  const fechaConvertida = fechaFin
    ? new Date(Date.parse(fechaFin.replace(/[-]/g, "/")))
    : null;
    
  if (!fechaConvertida || isNaN(fechaConvertida.getTime())) {
    return <div>Fecha no válida</div>; 
  }

  const { seconds, hours, minutes, days, isRunning, pause, start } = useTimer({
    expiryTimestamp: fechaConvertida,
  });

  useEffect(() => {
    if (days === 0 && hours === 0 && minutes < minutosCriticos) {
      if (onTiempoCritico && typeof onTiempoCritico === "function") {
        onTiempoCritico();
      }
    }
  }, [minutes, minutosCriticos, onTiempoCritico, hours, days]);

  useEffect(() => {
    if (days > 0 && isRunning) {
      pause();
    } else if (days === 0 && !isRunning) {
      start();
    }
  }, [days, isRunning, pause, start]);

  if (days > 0) {
    return (
      <>
        {fechaConvertida.getMonth() + 1}/{fechaConvertida.getDate()}{" "}
        {fechaConvertida.getHours()}:{fechaConvertida.getMinutes()}
      </>
    );
  }

  return (
    <>
      {`${hours >= 10 ? hours : "0" + hours}:${
        minutes >= 10 ? minutes : "0" + minutes
      }:${seconds >= 10 ? seconds : "0" + seconds}`}
    </>
  );
};

export default Temporizador;
