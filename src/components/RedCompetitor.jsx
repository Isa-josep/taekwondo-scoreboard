import React, { useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";

const RedCompetitor = () => {
  const { state, dispatch } = useContext(ScoreContext);

  return (
    <div className="competitor red">
      <h2 className="competitor-name">G.G. GONZÁLEZ</h2>

      <div className="score-container">
        <h1 className="score">{state.redScore}</h1>
      </div>

      <div className="warnings">
        <p>Amonestaciones</p>
        <span>{state.redWarnings}</span>
      </div>

      {/* Botones organizados en cuadrícula 2x2 */}
      <div className="control-buttons-grid">
        <button onClick={() => dispatch({ type: "ADD_WARNING", color: "redWarnings" })}>+ Amonestación</button>
        <button onClick={() => dispatch({ type: "ADD_POINT", color: "redScore" })}>+ Punto</button>
        <button onClick={() => dispatch({ type: "SUBTRACT_WARNING", color: "redWarnings" })}>- Amonestación</button>
        <button onClick={() => dispatch({ type: "SUBTRACT_POINT", color: "redScore" })}>- Punto</button>
      </div>
    </div>
  );
};

export default RedCompetitor;
