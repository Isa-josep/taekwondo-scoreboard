import React, { useState, useEffect } from "react";

const Timer = ({ initialTime = 120, onTimeEnd }) => {
  const [time, setTime] = useState(initialTime); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(false); // Estado del temporizador

  // Maneja el inicio y pausa del temporizador
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            if (onTimeEnd) onTimeEnd(); // Llamada al finalizar el tiempo
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, onTimeEnd]);

  // Maneja la tecla de espacio para alternar el estado (pausa/inicia)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Previene el scroll al presionar espacio
        setIsRunning((prev) => !prev); // Alterna el estado
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Formatea el tiempo (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <h1>{formatTime(time)}</h1>
      <div className="timer-controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={() => setTime(initialTime)}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Timer;
