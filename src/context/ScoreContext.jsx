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
    // ✅ SUMAR PUNTO MANUAL
    case "ADD_POINT":
      return {
        ...state,
        [action.color]: state[action.color] + 1,
        updateKey: state.updateKey + 1,
      };

    // ✅ RESTAR PUNTO MANUAL
    case "SUBTRACT_POINT":
      return {
        ...state,
        [action.color]: state[action.color] > 0 ? state[action.color] - 1 : 0,
        updateKey: state.updateKey + 1,
      };

    // ✅ SUMAR AMONESTACIÓN MANUAL
    case "ADD_WARNING":
      return {
        ...state,
        [action.color]: state[action.color] + 1,
        updateKey: state.updateKey + 1,
      };

    // ✅ RESTAR AMONESTACIÓN MANUAL
    case "SUBTRACT_WARNING":
      return {
        ...state,
        [action.color]: state[action.color] > 0 ? state[action.color] - 1 : 0,
        updateKey: state.updateKey + 1,
      };

    // 🔄 PUNTOS REGISTRADOS POR LOS JUECES
    case "ADD_JUDGE_ACTION":
      const currentTime = Date.now();
      const updatedActions = [...state.judgeActions, { ...action.payload, time: currentTime }];
      const totalJudges = navigator.getGamepads().filter(Boolean).length;

      const recentActions = updatedActions.filter((a) => currentTime - a.time <= 2000);

      const uniqueActions = recentActions.reduce((acc, action) => {
        const key = `${action.judgeId}-${action.color}-${action.points}`;
        if (!acc[key]) {
          acc[key] = action;
        }
        return acc;
      }, {});

      const groupedActions = Object.values(uniqueActions).reduce((acc, action) => {
        const key = `${action.color}-${action.points}`;
        acc[key] = acc[key] || [];
        acc[key].push(action.judgeId);
        return acc;
      }, {});

      for (const [key, judgeIds] of Object.entries(groupedActions)) {
        if (judgeIds.length >= (totalJudges === 1 ? 1 : 2)) {
          const [color, points] = key.split("-");
          return {
            ...state,
            judgeActions: [],
            [color]: state[color] + parseInt(points),
            updateKey: state.updateKey + 1,
          };
        }
      }

      return {
        ...state,
        judgeActions: Object.values(uniqueActions),
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

  return (
    <ScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScoreContext.Provider>
  );
};
