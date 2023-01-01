import React from 'react'
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { bulkCreate } from '../../redux/actions';
import stylo from "./NavBar.module.css"

// const customLocation = {
//   pathname: '/location',
//   state: { extraData: 'Henry' }
// }

export default function NavBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  function handleClick(string) {
    history.push(string);
  }
  function handleChange(event){
    if(event.target.value === 'Bulk Create')
      dispatch(bulkCreate(true))
    if(event.target.value === 'Single Create')
      dispatch(bulkCreate(false))
    event.target.value = "Actividades"    
  }


  return (
    <div className={stylo.container}>
      
      <button className={stylo.buttonX} onClick={() => history.goBack()}>{'<'}</button>
      <button className={stylo.buttonX} onClick={()=>handleClick("/about")}>Acerca de</button>
      <select onClick={()=>handleClick("/activities")} onChange={handleChange} defaultValue={'Actividades'} className={stylo.buttonX} name="activity mode">Actividades
        <option hidden value="Actividades">Actividades</option>
        <option value="Bulk Create">Asignar</option>
        <option value="Single Create">Crear</option>
      </select>
      <button  className={stylo.buttonX} onClick={()=>handleClick("/countries")}>Países</button>
    </div>
  )
}
