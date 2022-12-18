import React from "react";
import stylo from "./Country.module.css";
import { changeBG } from "../../redux/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

Country.propTypes = {
  name: PropTypes.string.isRequired,
  flags: PropTypes.string.isRequired,
  continents: PropTypes.string.isRequired
};

/*
  area: "180"
capital: "Oranjestad"
cca3: "ABW"
continents: "North America"
flags: "https://flagcdn.com/aw.svg"
name: "Aruba"
population: "106766"
subregion: "Caribbean"
  */
export default function Country({ name, flags, continents }) {
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    dispatch(changeBG(continents));
    console.log(continents);
  };
  const handleMouseLeave = () => {
    dispatch(changeBG('Other'));
  };
  return (
    <div
      className={stylo.container}
      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={()=>{
        handleMouseLeave()
      }}
    >
      <div className={stylo.title}> {name} </div>
      <div className={stylo.cca3}> Continente: {continents}</div>
      <img className={stylo.flag} src={flags} alt="Bandera del pais :" />
    </div>
  );
}
