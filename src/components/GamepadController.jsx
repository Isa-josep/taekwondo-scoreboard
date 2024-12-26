import React, { useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";
import { useGamepad } from "../hooks/useGamepad";

const GamepadController = () => {
  const { dispatch } = useContext(ScoreContext);

  const handleButtonPress = (mappedAction) => {
    console.log("Acción recibida del control:", mappedAction);
    if (mappedAction.action === "ADD_POINT") {
      dispatch({
        type: "ADD_POINT",
        color: mappedAction.color,
        points: mappedAction.points,
      });
    }
  };

  useGamepad(handleButtonPress);

  return (
    <div>
      <h2>Controles en Uso</h2>
      <p>Presiona un botón en el control para sumar puntos.</p>
    </div>
  );
};

export default GamepadController;
