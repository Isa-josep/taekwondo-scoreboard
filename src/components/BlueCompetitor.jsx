import React, { useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";

const BlueCompetitor = () => {
  const { state } = useContext(ScoreContext);

  return (
    <div className="competitor blue">
      <h2 className="competitor-name">J.A. PUERTO</h2> {/* Nombre del competidor */}
      <div className="score-container">
        <h1 className="score">{state.blueScore}</h1>
      </div>
      <div className="warnings">
        <p>Amonestaciones</p>
        <span>{state.blueWarnings}</span>
      </div>
    </div>
  );
};

export default BlueCompetitor;
