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
      dispatch(assignActivity([[selectedCountry.cca3], [idActivity]]));//dentro de un useEffect por el delay
  }, [idActivity]);//se ejecuta al actualizarse idActivity

  return (
    <div className={stl['container']}
      onDrop={(ev) => handleDrop(ev)}
      onDragOver={(ev) => ev.preventDefault()}
      
    >
      {selectedCountry
        ? Object.keys(selectedCountry).map((key) => {
            return (
              <div className={stl[key]} key={key}>
                {key === "Activities" ? (
                  selectedCountry[key].map((act) => {
                    return (<div className={stl['Activity']} key={act.name}>
                      <Activity 
                        belongsToCountry={selectedCountry.cca3}
                        
                        name={act.name}
                        season={act.season}
                        difficulty={act.difficulty}
                        duration={act.duration}
                      /></div>
                    );
                  })
                ) : key === 'flags' ?
                <img className={stl[key]} src={selectedCountry[key]}></img> 
                :(
                  <p  className={stl[key]}>{key + ": " + selectedCountry[key]}</p>
                )}
              </div>
            );
          })
        : null}
    </div>
  );
}
