import React, { useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";

const BlueCompetitor = () => {
  const { state, dispatch } = useContext(ScoreContext);

  return (
    <div className="competitor blue">
      <h2 className="competitor-name">J.A. PUERTO</h2>

      <div className="score-container">
        <h1 className="score">{state.blueScore}</h1>
      </div>

      <div className="warnings">
        <p>Amonestaciones</p>
        <span>{state.blueWarnings}</span>
      </div>

      {/* Botones organizados en cuadrícula 2x2 */}
      <div className="control-buttons-grid">
        <button onClick={() => dispatch({ type: "ADD_WARNING", color: "blueWarnings" })}>+ Amonestación</button>
        <button onClick={() => dispatch({ type: "ADD_POINT", color: "blueScore" })}>+ Punto</button>
        <button onClick={() => dispatch({ type: "SUBTRACT_WARNING", color: "blueWarnings" })}>- Amonestación</button>
        <button onClick={() => dispatch({ type: "SUBTRACT_POINT", color: "blueScore" })}>- Punto</button>
      </div>
    </div>
  );
};

export default BlueCompetitor;
