/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Activity from "./Activity";
import stl from "./AllActivities.module.css";
import { useDispatch } from "react-redux";
import { fetchActivities } from "../../redux/actions";
import PropTypes from "prop-types";

Activities.propTypes = {
  filtered: PropTypes.bool,
};

export default function Activities({ filtered }) {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const [visibleActivities, setvisibleActivities] = useState([]);

  const selectedCountry = useSelector((state) => state.selectedCountry);

  useEffect(() => {
    console.log(selectedCountry);
    if (filtered)
      setvisibleActivities(selectedCountry.Activities.map((ele) => ele.name));
    if (!filtered) dispatch(fetchActivities());
    console.log(activities);
    modificarDisplay();
  }, [dispatch, selectedCountry]);

  let display = <>No se encontraron actividades en la database</>;
  function modificarDisplay() {
    if (filtered && Object.keys(selectedCountry).length === 0)
      display = <div>Debe de ir a Países y seleccionar un pais primero</div>;
    else
      display = (
        <>
          {activities.length !== visibleActivities.length ? (
            activities.map((act) => {
              if (!visibleActivities.includes(act.name))
                return (
                  <Activity
                    filtered={filtered}
                    key={act.name}
                    id={act.id}
                    name={act.name}
                    season={act.season}
                    difficulty={act.difficulty}
                    duration={act.duration}
                  />
                );
            })
          ) : filtered ? (
            <>Ya no hay más actividades para agregar</>
          ) : (
            <>No se encontraron actividades en la database</>
          )}
        </>
      );
  }
  modificarDisplay();
  return <div className={stl.divDeActividades}>{display}</div>;
}
