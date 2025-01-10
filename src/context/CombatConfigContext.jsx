import React, { createContext, useState } from "react";

export const CombatConfigContext = createContext();

export const CombatConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({
    category: "adult", // 'adult' o 'child'
    roundTime: 120,    // Duración del round en segundos
    restTime: 60,      // Duración del descanso en segundos
    totalRounds: 3,    // Número total de rounds
  });

  const updateConfig = (newConfig) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
  };

  return (
    <CombatConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </CombatConfigContext.Provider>
  );
};
