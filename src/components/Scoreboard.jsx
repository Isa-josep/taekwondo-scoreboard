import React from "react";
import BlueCompetitor from "./BlueCompetitor";
import RedCompetitor from "./RedCompetitor";
import CenterInfo from "./CenterInfo";
import ControlButtons from "./ControlButtons";
import "../styles/Scoreboard.css";

const Scoreboard = () => {
  return (
    <div className="scoreboard">
      <BlueCompetitor />
      <CenterInfo />
      <RedCompetitor />
      <ControlButtons />
    </div>
  );
};

export default Scoreboard;
