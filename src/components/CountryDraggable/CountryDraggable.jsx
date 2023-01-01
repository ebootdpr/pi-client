import React from "react";
import stylo from "./CountryDraggable.module.css";

import PropTypes from "prop-types";

CountryDraggable.propTypes = {
  name: PropTypes.string.isRequired,
  cca3: PropTypes.string,
  flags: PropTypes.string,
  continents: PropTypes.string,
  filtered: PropTypes.bool,
  gridpos: PropTypes.number,
};


 const styleJS = {
  width: 120 +"px",
  height: 80 + "px",
 }
export default function CountryDraggable({filtered,cca3, name, flags, continents , gridpos}) {

  const handleClick = () => {
    //BORRA DEL STORE LOCAL EL PAIS
    //(event.target.value));

  };

  const handleDrag = (event) => {
    event.dataTransfer.setData("text/plain", cca3);
  };

  let boton = (
      <button
        className={stylo.closeButton}
        value={name}
        onClick={handleClick}
      >
        X
      </button>
    );
  
     
  return (
    <div
      style={filtered ? styleJS : {}}
      className={filtered ? stylo.container :`${stylo.card} ${stylo["card"+gridpos]}`}
      draggable onDragStart={handleDrag}
    >
      
      <div className={stylo.textName} >{name} </div>
      {filtered ? boton :
      <div className={ stylo.textContinent}> Continente: {continents}</div>}
      <img className={stylo.flag} src={flags} alt="Bandera del pais :" />
    </div>
  );
}
