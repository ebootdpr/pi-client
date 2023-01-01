/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignActivity } from "../../redux/actions";
import Activity from "../Activities/Activity";
import stl from "./CountryDetails.module.css"

export default function CountryDetails() {
  const dispatch = useDispatch();
  const selectedCountry = useSelector((state) => state.selectedCountry);
  // let selectedActivitiesID = useSelector((state) => state.selectedActivitiesID);
  // const activities = useSelector((state) => state.activities);
  //? DISEÑO
  /*
  Guarda en un estado local global
  */
//  const listaActividadesDelPais = useSelector(state=>state.selectedCountry.Activities)  
  const [idActivity, setIdActivity] = useState(""); //crea un store local vacio al inicio
  const handleDrop = (ev) => {
    ev.preventDefault();
    setIdActivity(ev.dataTransfer.getData("text/plain"));
     //modifica store local
  };
  useEffect(() => { //se ejecuta al modificarse el store local
    if (idActivity)//para ignorar cuando se monta.
      dispatch(assignActivity([[selectedCountry.cca3], [idActivity]]));
  }, [idActivity]);//se ejecuta al actualizarse idActivity


  return (
    <div className={stl['container']}
      onDrop={(ev) => handleDrop(ev)}
      onDragOver={(ev) => ev.preventDefault()}
    >
      <div className={stl.detailscontainer}>
        <div  className={stl['name']}>
          <h3>CCA3 y Nombre: </h3>
          <h4>{'['}{selectedCountry.cca3}{']'} {selectedCountry.name}</h4>
        </div>
        <div  className={stl['continents']}>
          <h3>Continente: </h3>
          <h4>{selectedCountry.continents}</h4>
        </div>
        <div  className={stl['capital']}>
          <h3>Capital: </h3>
          <h4>{selectedCountry.capital}</h4>
        </div>
        <div  className={stl['subregion']}>
          <h3>subregion: </h3>
          <h4>{selectedCountry.subregion}</h4>
        </div>
        <div  className={stl['area']}>
          <h3>Area: </h3>
          <h4>{selectedCountry.area}</h4>
        </div>
        <div  className={stl['population']}>
          <h3>Populación: </h3>
          <h4>{selectedCountry.population}</h4>
        </div>
        <div  className={stl['flags']}>
          <img src={selectedCountry.flags} alt="Bandera del pais" />
        </div>
        <div className={stl.actividadesInternas}>
        <h3>Actividades Turísticas:</h3>
          {selectedCountry['Activities']?.map((act) => {
                    return (<div className={stl['Activity']} key={act.name}>
                      <Activity 
                        belongsToCountry={selectedCountry.cca3}
                        name={act.name}
                        season={act.season}
                        difficulty={act.difficulty}
                        duration={act.duration}
                      /></div>
                    );
                  })}
          </div>
        </div>
    </div>
  );
}
