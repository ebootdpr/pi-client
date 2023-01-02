/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import CountryDraggable from "../CountryDraggable/CountryDraggable";
import { useHistory } from "react-router-dom";
import stylo from "./BulkActivities.module.css";
import { useDispatch } from "react-redux";
import { assignActivity, fetchActivities } from "../../redux/actions";
import Activity from "./Activity";
BulkActivities.propTypes = {
  activityName: PropTypes.string,
  id: PropTypes.number,
};
function BulkActivities(props) {
  //agarra del store global, las actividades y los paises
  const dispatch = useDispatch();
  const activities = useSelector((store) => store.activities);
  const countries = useSelector((store) => store.countries);
  const [activitiesToAdd, setActivitiesToAdd] = useState([]);
  const [countriesToAdd, setCountriesToAdd] = useState([]);
  const [paisesDisponibles, setPaisesDisponibles] = useState([]);
  const [actividadesDisponivles, setActividadesDisponivles] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermActivity, setSearchTermActivity] = useState("");

  //filtra los paises de tal forma que no se muestren los paises q ya tienen esa actividad

  //COMPONENT DID MOUNT
  useEffect(() => {
    dispatch(fetchActivities());
    setActividadesDisponivles(activities);
  }, []);

  //[searchTerm,countriesToAdd, activitiesToAdd]
  useEffect(() => {
    const arrayDePaisesDisponiblesBuscados = countries.filter((pais) => {
      return pais.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    const filtradoPorYaAñadidos = arrayDePaisesDisponiblesBuscados.filter(
      (pais) => {
        return !countriesToAdd.some(
          (paisAñadido) => paisAñadido.name === pais.name
        );
      }
    );
    const paisesdisp = filtradoPorYaAñadidos.filter((pais) => {
      if (pais.Activities.length === 0) return true;
      return !pais.Activities.some((activPais) =>
        activitiesToAdd.some((activ) => activ.name === activPais.name)
      );
    });
    if(cstatus.step === 2)
    setCstatus({...cstatus, notempty: countriesToAdd.length !== 0})
    setPaisesDisponibles(paisesdisp);
  }, [searchTerm, countriesToAdd, activitiesToAdd]);

  useEffect(() => {
    const arrayDeActividadesBuscadas = activities.filter((activity) => {
      return activity.name
        .toLowerCase()
        .includes(searchTermActivity.toLowerCase());
    });
    //buscador funciona
    const activiDisp = arrayDeActividadesBuscadas.filter((act) => {
      return !activitiesToAdd.some((activ) => activ.name === act.name);
    });
    if(cstatus.step === 1)
    setCstatus({...cstatus, notempty: activitiesToAdd.length !== 0})
    setActividadesDisponivles(activiDisp);
  }, [searchTermActivity, activitiesToAdd]);

  //search terms
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
  function handleChangeActivity(e) {
    setSearchTermActivity(e.target.value);
  }

  const handleDrop = (ev) => {
    ev.preventDefault();
    const datoRecibido = ev.dataTransfer.getData("text/plain");
    if (!isNaN(datoRecibido))
      setActivitiesToAdd([
        ...activitiesToAdd,
        activities.find((ele) => ele.id == datoRecibido),
      ]);
    else
      setCountriesToAdd([
        ...countriesToAdd,
        countries.find((ele) => ele.cca3 === datoRecibido),
      ]);

    //setIdActivity(ev.dataTransfer.getData("text/plain"));
  };
  const [sucess, setSucess] = useState(false);
  function handleClickAssign() {
    if (cstatus.step === 2) {
      dispatch(
        assignActivity([
          countriesToAdd.map((e) => e.cca3),
          activitiesToAdd.map((e) => e.id),
        ])
      );
      setSucess(true);
      setCstatus({ step: 1, buttonName: "SIGUIENTE", notempty: false });
    }
    if (cstatus.step === 1) {
      setCstatus({ step: 2, buttonName: "ASIGNAR", notempty: false });
    }
  }
  function handleClickSucessClose() {
    setSucess(false);
    setCountriesToAdd([]);
    setActivitiesToAdd([]);
  }
  const [cstatus, setCstatus] = useState({ step: 1, buttonName: "SIGUIENTE" , notempty: false});

  return (
    <div className={stylo.container}>
      {sucess ? (
        <div className={stylo.sucessBox}>
          <h1>
            Se han asignado las actividades elegidas a los paises
            correspondientes
          </h1>
          <button onClick={handleClickSucessClose}>CERRAR</button>
        </div>
      ) : null}
      {/* Bloque activitiesToAdd y countriesToAdd */}
      <div
        className={stylo.disponiblesContainer}
        onDrop={(ev) => handleDrop(ev)}
        onDragOver={(ev) => ev.preventDefault()}
      >
        {cstatus.step === 2 ? countriesToAdd.length == 0 ? (
          <h1 className={stylo.paisesdisponibles}>Arrastre aquí algun pais </h1>
        ) : (
          <div className={stylo.paisesdisponibles}>
            {countriesToAdd.map((obj) => (
              <CountryDraggable
                filtered={true}
                key={obj.cca3}
                name={obj.name}
                flags={obj.flags}
                cca3={obj.cca3}
                continents={obj.continents}
              />
            ))}
          </div>
        )
        : activitiesToAdd.length == 0 ? (
          <h1 className={stylo.paisesdisponibles}>
            Arrastre aqui alguna actividad{" "}
          </h1>
        ) : (
          <div className={stylo.paisesdisponibles}>
            {activitiesToAdd.map((obj) => (
              <Activity
                filtered={true}
                key={obj.id}
                id={obj.id}
                name={obj.name}
                season={obj.season}
                difficulty={obj.difficulty}
                duration={obj.duration}
              />
            ))}
          </div>
        )}
      </div>
      {/* BOTON - - - - - - - -- - - - - - - - --  - */}
      <div>
        <button className={stylo.botonasignar} disabled={!cstatus.notempty} onClick={handleClickAssign}>
        {cstatus.buttonName}
        </button>
      </div>
      <div className={stylo.disponiblesContainer}>
        {cstatus.step === 2 ?
        <div>
          <h1>Paises</h1>
          <input
            placeholder="Buscar por nombre"
            value={searchTerm}
            name="busca"
            onChange={handleChange}
            type="text"
          />

          <div className={stylo.paisesdisponibles}>
            {paisesDisponibles.map((obj) => (
              <CountryDraggable
                filtered={true}
                key={obj.cca3}
                name={obj.name}
                flags={obj.flags}
                cca3={obj.cca3}
                continents={obj.continents}
              />
            ))}
          </div>
        </div>:
        <div>
          <h1>Actividades</h1>
          <input
            placeholder="Buscar por nombre"
            value={searchTermActivity}
            name="busca"
            onChange={handleChangeActivity}
            type="text"
          />

          <div className={stylo.paisesdisponibles}>
            {actividadesDisponivles.map((obj) => (
              <Activity
                filtered={true}
                key={obj.id}
                id={obj.id}
                name={obj.name}
                season={obj.season}
                difficulty={obj.difficulty}
                duration={obj.duration}
              />
            ))}
          </div>
        </div>}
      </div>
    </div>
  );
}

export default BulkActivities;
