import React, { createContext, useReducer } from "react";

// Estado inicial
const initialState = {
  blueScore: 0,
  redScore: 0,
  round: 1,
  blueWarnings: 0,
  redWarnings: 0,
  updateKey: 0, // Clave única para forzar re-render
  judgeActions: [], // Acciones de los jueces en tiempo real
  lastJudgePress: {}, // Registro del último tiempo de acción por juez
};

// Reducer para manejar acciones
const scoreReducer = (state, action) => {
  console.log("Acción recibida en el reducer:", action);

  switch (action.type) {
    case "ADD_JUDGE_ACTION":
      const currentTime = Date.now();
      const updatedActions = [...state.judgeActions, { ...action.payload, time: currentTime }];
      const totalJudges = navigator.getGamepads().filter(Boolean).length; // Número de controles conectados

      // Filtra las acciones dentro del lapso de 2 segundos
      const recentActions = updatedActions.filter((a) => {
        const timeDiff = currentTime - a.time;
        console.log(`Tiempo restante para la acción del juez ${a.judgeId}: ${2000 - timeDiff}ms`);
        return timeDiff <= 2000; // Acciones dentro de 2 segundos
      });

      // Evita que un mismo juez registre múltiples acciones para el mismo botón
      const uniqueActions = recentActions.reduce((acc, action) => {
        const key = `${action.judgeId}-${action.color}-${action.points}`;
        if (!acc[key]) {
          acc[key] = action; // Guarda la acción si no existe previamente
        }
        return acc;
      }, {});

      // Agrupa las acciones por color y puntos
      const groupedActions = Object.values(uniqueActions).reduce((acc, action) => {
        const key = `${action.color}-${action.points}`;
        acc[key] = acc[key] || [];
        acc[key].push(action.judgeId); // Almacena los IDs de los jueces
        return acc;
      }, {});

      console.log("Acciones únicas agrupadas:", groupedActions);

      // Verifica si alguna acción cumple con el número requerido de jueces
      for (const [key, judgeIds] of Object.entries(groupedActions)) {
        if (judgeIds.length >= (totalJudges === 1 ? 1 : 2)) {
          const [color, points] = key.split("-");
          console.log(
            `Punto registrado para ${color} (${points} puntos) por jueces: ${judgeIds.join(", ")}`
          );
          return {
            ...state,
            judgeActions: [], // Reinicia las acciones de los jueces
            [color]: state[color] + parseInt(points),
            updateKey: state.updateKey + 1, // Incrementa la clave para forzar re-render
          };
        }
      }

      return {
        ...state,
        judgeActions: Object.values(uniqueActions), // Actualiza las acciones únicas
      };

    default:
      return state;
  }
};

// Crear el contexto
export const ScoreContext = createContext();

// Proveedor del contexto
export const ScoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scoreReducer, initialState);

  // console.log("Estado actual del contexto:", state);
  
  return (
    <ScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreContext.Provider>
  );
};
