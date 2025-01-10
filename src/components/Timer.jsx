import React, { useState, useEffect, useContext } from "react";
import { CombatConfigContext } from "../context/CombatConfigContext"; // Importa correctamente el contexto

const Timer = ({ onRoundEnd, onCombatEnd }) => {
  const { config } = useContext(CombatConfigContext); // Asegúrate de usar CombatConfigContext
  const [timeLeft, setTimeLeft] = useState(config.roundTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      if (isResting) {
        if (currentRound < config.totalRounds) {
          setCurrentRound((prevRound) => prevRound + 1);
          setTimeLeft(config.roundTime);
          setIsResting(false);
        } else {
          onCombatEnd();
        }
      } else {
        onRoundEnd(currentRound);
        setTimeLeft(config.restTime);
        setIsResting(true);
      }
    }
    return () => clearInterval(timer);
  }, [timeLeft, isResting, currentRound, config, onRoundEnd, onCombatEnd]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      {/* <h2>{isResting ? "Descanso" : `Round ${currentRound}`}</h2>
      <p>Tiempo restante: {formatTime(timeLeft)}</p> */}
    </div>
  );
};

export default Timer;
