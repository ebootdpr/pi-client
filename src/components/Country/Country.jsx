import React from "react";
import stylo from "./Country.module.css";
import { changeBG, fetchByCCA3 } from "../../redux/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
Country.propTypes = {
  name: PropTypes.string.isRequired,
  cca3: PropTypes.string,
  flags: PropTypes.string,
  continents: PropTypes.string,
  filtered: PropTypes.bool,
  gridpos: PropTypes.number,
};

/*
  ? DISEÑO
  hacer que al clickear aparezca el detal como fixed
  hacer q todos lso botones de fondo sean inclickeables con disable
  */
 const styleJS = {
  width: 120 +"px",
  height: 80 + "px",
 }
export default function Country({filtered, cca3, name, flags, continents , gridpos}) {
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    dispatch(changeBG(continents));
  };
  const history = useHistory();
  
  const handleMouseLeave = () => {
    dispatch(changeBG('Other'));
  };

  function handleClick(string) {
    if(filtered) return;
    dispatch(fetchByCCA3(string))

    history.push('/countries/details');
    
  }
 
  
  
     
  return (
    <div
      style={filtered ? styleJS : {}}
      className={filtered ? stylo.container :`${stylo.card} ${stylo["card"+gridpos]}`}
      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={()=>{
        handleMouseLeave()
      }}
      onClick={()=>handleClick("/"+cca3)}
    >
      <div className={stylo.textName} > {name} </div>
      {filtered ? null :
      <div className={ stylo.textContinent}> Continente: {continents}</div>}
      <img className={stylo.flag} src={flags} alt="Bandera del pais :" />
    </div>
  );
}
