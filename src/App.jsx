import React, { useContext } from "react";
import { ScoreContext } from "./context/ScoreContext";
import ScoreDisplay from "./components/ScoreDisplay";
import Timer from "./components/Timer";
import GamepadController from "./components/GamepadController"; // Asegúrate de importar GamepadController

const App = () => {
  const { dispatch } = useContext(ScoreContext);

  const addPoint = () => {
    dispatch({
      type: "ADD_POINT",
      color: "blueScore",
      points: 1,
    });
  };

  return (
    <div className="App">
      <ScoreDisplay />
      <Timer initialTime={120} onTimeEnd={() => alert("¡El tiempo terminó!")} />
      <GamepadController /> {/* Agrega el componente aquí */}
      <button onClick={addPoint}>Sumar Punto Azul</button>
    </div>
  );
};

export default App;
