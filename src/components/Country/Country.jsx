import React from "react";
import stylo from "./Country.module.css";
import { changeBG, fetchByCCA3 } from "../../redux/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

Country.propTypes = {
  name: PropTypes.string.isRequired,
  cca3: PropTypes.string.isRequired,
  flags: PropTypes.string.isRequired,
  continents: PropTypes.string.isRequired
};

/*
  ? DISEÑO
  hacer que al clickear aparezca el detal como fixed
  hacer q todos lso botones de fondo sean inclickeables con disable
  */
export default function Country({cca3, name, flags, continents }) {
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    dispatch(changeBG(continents));
  };
  const history = useHistory();
  const handleMouseLeave = () => {
    dispatch(changeBG('Other'));
  };

  function handleClick(string) {
    dispatch(fetchByCCA3(string))
    history.push('/countries/details');
  }
  
     
  return (
    <div
      className={stylo.container}
      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={()=>{
        handleMouseLeave()
      }}
      onClick={()=>handleClick("/"+cca3)}
    >
      <div className={stylo.textName}> {name} </div>
      <div className={stylo.textContinent}> Continente: {continents}</div>
      <img className={stylo.flag} src={flags} alt="Bandera del pais :" />
    </div>
  );
}
