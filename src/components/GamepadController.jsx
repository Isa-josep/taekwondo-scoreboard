import React, { useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";
import { useGamepad } from "../hooks/useGamepad";

const GamepadController = () => {
  const { dispatch } = useContext(ScoreContext);

  const handleButtonPress = (mappedAction) => {
    console.log("Acción recibida del control:", mappedAction);
    if (mappedAction.action === "ADD_JUDGE_ACTION") {
      dispatch({
        type: "ADD_JUDGE_ACTION",
        payload: {
          color: mappedAction.color,
          points: mappedAction.points,
          judgeId: mappedAction.judgeId,
        },
      });
    }
  };

  useGamepad(handleButtonPress);

  return (
    <div>
      {/* <h2>Control Activo</h2> */}
      {/* <p>Los puntos se registrarán según el número de jueces conectados y si todos coinciden.</p> */}
    </div>
  );
};

export default GamepadController;
