import React from "react";
import stl from "./AllActivities.module.css";

import PropTypes from "prop-types";

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

function minToHours(min) {
  min = Number(min);
  let d = 0;
  let h = Math.floor(min / 60);
  if (h > 24) {
    d = Math.floor(min / 24);
    h = Math.floor(min % 24);
  }
  let m = Math.floor(min % 60);
  let dDisplay = d > 0 ? d + (d == 1 ? " día " : " días ") : "";
  let hDisplay = h > 0 ? h + (h == 1 ? " hs " : " hs ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " minuto " : " minutos ") : "";

  return dDisplay + hDisplay + mDisplay;
}
function stars(num) {
  num = parseInt(num);
  switch (num) {
    case 1:
      return "★";
    case 2:
      return "★★";
    case 3:
      return "★★★";
    case 4:
      return "★★★★";
    default:
      return "★★★★★";
  }
}
export default function Activity(props) {
  const handleClick = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={stl.card}>
      <button
        className={stl.closeButton}
        value={props.name}
        onClick={handleClick}
      >
         X 
      </button>
      <span>
        {" "}
        <strong>{props.name}</strong>
      </span>
      <span>Estación: {props.season}</span>
      <span>Dificultad: {stars(props.difficulty)}</span>
      <span>Duración: {minToHours(props.duration)}</span>
    </div>
  );
}
