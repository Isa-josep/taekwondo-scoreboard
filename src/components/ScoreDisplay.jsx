import React, { useContext } from "react";
import { ScoreContext } from "../context/ScoreContext";
import "../styles/ScoreDisplay.css";
const ScoreDisplay = () => {
  const { state } = useContext(ScoreContext);

  console.log("Estado actual del marcador:", state);

  return (
    <div className="score-display">
      <div className="competitor blue">
        <h2>Competidor Azul</h2>
        <h1 className="score">{state.blueScore}</h1>
        <p>Amonestaciones: {state.blueWarnings}</p>
      </div>
      <div className="round-info">
        <h3>Round: {state.round}</h3>
      </div>
      <div className="competitor red">
        <h2>Competidor Rojo</h2>
        <h1 className="score">{state.redScore}</h1>
        <p>Amonestaciones: {state.redWarnings}</p>
      </div>
    </div>
  );
};

export default ScoreDisplay;
