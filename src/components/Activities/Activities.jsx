import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Activity from './Activity';
import stl from "./AllActivities.module.css";
import { useDispatch } from 'react-redux';
import { fetchActivities } from '../../redux/actions';



export default function Activities() {
  const dispatch = useDispatch();
  const activty = useSelector((state) => state.activities);
  useEffect(() => {
    dispatch(fetchActivities());
  }, []);
  
  return (
    <div className={stl.divDeActividades}>
      {activty.length ? 
      activty.map(act=>{
        return <Activity key={act.name}
        name={act.name}
        season={act.season}
        difficulty={act.difficulty}
        duration={act.duration}
        />
      })
      : <>No se encontraron actividades en la database</>}
      
    </div>
  )
}
