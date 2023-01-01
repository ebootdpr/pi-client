/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
//estado local, no es necesario globarl para el formuario
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addActivity } from "../../redux/actions";
import Activity from "./Activity";
import { validateBodyActivities } from "../../redux/actions/validators";
import stl from "./AllActivities.module.css";
import { useSelector } from "react-redux";
import BulkActivities from "./BulkActivities";
import PropTypes from 'prop-types';

CreateActivity.propTypes = {
  filtered: PropTypes.bool,

}

export default function CreateActivity(props) {
  const dispatch = useDispatch();
  const handleSubmit = (evento) => {
    evento.preventDefault();
    // dispatch(fetchActivities());
    const len = Object.entries(errors).length;
    console.log(len);

    if (len === 0) dispatch(addActivity(inputs));
    setErrors({
      name: "",
      season: "",
      difficulty: "",
      duration: "",
    });
    setInputs({
      name: "",
      season: "Verano",
      difficulty: 1,
      duration: 120,
    });
  };
  //crea estado local
  const [inputs, setInputs] = useState({
    name: "",
    season: "Verano",
    difficulty: 1,
    duration: 120,
  });
  const [errors, setErrors] = useState({
    name: "",
    season: "",
    difficulty: "",
    duration: "",
  });

  const handleChange = (evento) => {
    setInputs({
      ...inputs,
      [evento.target.name]: evento.target.value,
    });
    setErrors(
      validateBodyActivities({
        ...inputs,
        [evento.target.name]: evento.target.value,
      })
    );
  };
  //#region  Busqueda por si esta repetido:
  const activities = useSelector((state) => state.activities);
  const [paisesDisponibles, setpaisesDisponibles] = useState([])
  let booleanoCambiante = false
  useEffect(() => {
    //buscador funciona
    booleanoCambiante = activities.some(activity => activity.name===inputs.name)
    if(booleanoCambiante)
    setErrors({...errors, alreadyExist: '¡Esa activdad Ya Existe!'})
    
}, [inputs.name])

//#endregion
  const habilitar =errors.name ||
    errors.difficulty ||
    errors.season ||
    errors.duration ||
    errors.alreadyExist;
  return (
    <div className={stl.crearActividad}>
      {/*props.filtered ? <BulkActivities/>: null*/}
      <form className={stl.formulario} action="" onSubmit={handleSubmit}>
      <h2>Crear actividad </h2>
        <div className={stl.labelinput}>
          <label htmlFor="">Nombre: </label>
          <input
            className={stl.name && stl.warning}
            type="text"
            name="name"
            placeholder="Nombre de la actividad..."
            value={inputs.name}
            onChange={handleChange}
          />
          {/* {errors.name ? <p className={stl.danger}>{errors.name}</p> : null} */}
        </div>
        <div className={stl.labelinput}>
          <label htmlFor="">Estación: </label>
          <input
            className={errors.season && stl.warning}
            type="text"
            name="season"
            placeholder="Escribe tu email..."
            value={inputs.season}
            onChange={handleChange}
          />

        </div>
        <div className={stl.labelinput}>
          <label htmlFor="">Difficultad:</label>
          <input
            className={errors.difficulty && stl.warning}
            type="number"
            name="difficulty"
            value={inputs.difficulty}
            onChange={handleChange}
          />
        </div>

        <div className={stl.labelinput}>
          <label htmlFor="">Duración:</label>
          <input
            className={stl.duration && stl.warning}
            type="number"
            name="duration"
            value={inputs.duration}
            onChange={handleChange}
          />
        </div>
        <button disabled={!inputs.name ||habilitar} type="submit">
          Enviar
        </button>
        {habilitar ? (
          <div className={stl.danger}>
            {Object.keys(errors).map((key) => {
              return <p key={key}>★{errors[key]}</p>;
            })}
          </div>
        ) : (
          null
        )}
        <Activity
        filtered = {true}
        name={inputs.name}
        season={inputs.season}
        difficulty={inputs.difficulty}
        duration={inputs.duration}
      />
      </form>

      
    </div>
  );
}
