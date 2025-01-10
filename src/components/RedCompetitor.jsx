import React, { useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";

const RedCompetitor = () => {
  const { state } = useContext(ScoreContext);

  return (
    <div className="competitor red">
      <h2 className="competitor-name">G.G. GONZÁLEZ</h2> {/* Nombre del competidor */}
      <div className="score-container">
        <h1 className="score">{state.redScore}</h1>
      </div>
      <div className="warnings">
        <p>Amonestaciones</p>
        <span>{state.redWarnings}</span>
      </div>
    </div>
  );
};

export default RedCompetitor;
