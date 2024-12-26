import React from "react";
import ScoreDisplay from "./components/ScoreDisplay";
import Timer from "./components/Timer";
import GamepadController  from "./components/GamepadController";

const App = () => {
  const handleTimeEnd = () => {
    alert("¡El tiempo del round ha terminado!");
  };

  return (
    <div className="App">
      <ScoreDisplay />
      <Timer initialTime={120} onTimeEnd={handleTimeEnd} />
      <GamepadController  />
    </div>
  );
};

export default App;
