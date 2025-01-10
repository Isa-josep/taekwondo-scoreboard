import React from "react";
import { CombatConfigProvider } from "./context/CombatConfigContext"; // Importa correctamente el proveedor
import ScoreDisplay from "./components/ScoreDisplay";
import Timer from "./components/Timer";
import GamepadController from "./components/GamepadController";

const App = () => {
  return (
    <CombatConfigProvider>
      <div className="App">
        <h1>Marcador de Taekwondo</h1>
        <ScoreDisplay />
        <Timer onRoundEnd={() => console.log("Round terminado")} onCombatEnd={() => console.log("Combate terminado")} />
        <GamepadController />
      </div>
    </CombatConfigProvider>
  );
};

export default App;
