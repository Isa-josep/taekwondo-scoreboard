import React, { createContext, useReducer } from "react";

// Estado inicial
const initialState = {
  blueScore: 0,
  redScore: 0,
  round: 1,
  blueWarnings: 0,
  redWarnings: 0,
  updateKey: 0, // Clave única para forzar re-render
};

// Reducer para manejar acciones
const scoreReducer = (state, action) => {
  console.log("Acción recibida en el reducer:", action);
  switch (action.type) {
    case "ADD_POINT":
      return {
        ...state,
        [action.color]: state[action.color] + action.points,
        updateKey: state.updateKey + 1, // Incrementa la clave única
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

  console.log("Estado actual del contexto:", state);
  
  return (
    <ScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreContext.Provider>
  );
};
