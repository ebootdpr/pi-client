import React from 'react'
// import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import stylo from "./NavBar.module.css"

// const customLocation = {
//   pathname: '/location',
//   state: { extraData: 'Henry' }
// }

export default function NavBar() {
  function handleClick(string) {
    history.push(string);
  }
  const history = useHistory();
  return (
    <div className={stylo.container}>
      <button className={stylo.buttonX} onClick={()=>handleClick("/about")}>Acerca de</button>
      <button className={stylo.buttonX} onClick={()=>handleClick("/activities")}>Actividades</button>
      <button  className={stylo.buttonX} onClick={()=>handleClick("/countries")}>Países</button>
    </div>
  )
}
