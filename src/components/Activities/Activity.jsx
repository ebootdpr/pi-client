/* eslint-disable no-unused-vars */
import React from "react";
import stl from "./AllActivities.module.css";

import PropTypes from "prop-types";
import { deleteActivityGlobally, deleteActivityLocally } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

Activity.propTypes = {
  name: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  difficulty: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  id: PropTypes.number,
  filtered: PropTypes.bool,
  belongsToCountry: PropTypes.string,
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
  let hDisplay = h > 0 ? h + (h == 1 ? " h " : " hs ") : "";
  let mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";

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
  const dispatch = useDispatch();

  const handleClick = (event) => {
    //borra globalmente de todos los paises
    dispatch(deleteActivityGlobally(event.target.value));
  };
  const handleClick2 = (event) => {
    //borra localmente de un pais
    dispatch(deleteActivityLocally(event.target.value,props.belongsToCountry))

  };
  const handleDrag = (event) => {
    event.dataTransfer.setData("text/plain", props.id);
  };
  //? DISEÑO
  /*
El boton de cerrar debe desaparecer si es filtered===true
El boron de cerrar debe de aparecer pero cambiar su funcionalidad si belongsToCountry===true
*/
  let boton;
  if (props.filtered) {
    boton = null;
  } else if (props.belongsToCountry) {
    boton = (
      <button
        className={stl.closeButton}
        value={props.name}
        onClick={handleClick2}
      >
        X
      </button>
    );
  } else {
    boton = (
      <button
        className={stl.closeButton}
        value={props.name}
        onClick={handleClick}
      >
        X
      </button>
    );
  }
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div className={stl.card} draggable onDragStart={handleDrag}>
      {boton}
      <span>
        <strong>{props.name}</strong>
      </span>
      <span>Estación: {props.season}</span>
      <span>Dificultad: {stars(props.difficulty)}</span>
      <span>Duración: {minToHours(props.duration)}</span>
    </div>
  );
}
