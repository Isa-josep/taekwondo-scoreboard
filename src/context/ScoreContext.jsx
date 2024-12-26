import React, { createContext, useReducer } from "react";

// Estado inicial
const initialState = {
  blueScore: 0,
  redScore: 0,
  round: 1,
  blueWarnings: 0,
  redWarnings: 0,
};

// Reducer para manejar acciones
const scoreReducer = (state, action) => {
  console.log("Acción recibida en el reducer:", action); // Verifica si el reducer recibe acciones
  switch (action.type) {
    case "ADD_POINT":
      return {
        ...state, // Copia el estado anterior
        [action.color]: state[action.color] + action.points, // Actualiza solo la clave especificada
      };
    default:
      return state; // Siempre retorna un nuevo estado
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
