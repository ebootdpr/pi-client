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
      <button onClick={()=>handleClick("/about")}>Acerca de</button>
      <button onClick={()=>handleClick("/activities")}>Actividades Turísticas</button>
      <button onClick={()=>handleClick("/countries")}>Países</button>
    </div>
  )
}
