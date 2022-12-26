import React, { useState } from 'react'
import Search from '../Search/Search'
import stylo from "./FilterBar.module.css"





export default function FilterBar() {
  const [isBuscarShown, setIsBuscarShown] = useState(false);
  const [isOrdenarShown, setIsOrdenarShown] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handleClickBuscar = _event => {
    // 👇️ toggle shown state
    setIsBuscarShown(current => !current);
  }
    // eslint-disable-next-line no-unused-vars
  const handleClickOrdenar = _event => {
    // 👇️ toggle shown state
    setIsOrdenarShown(current => !current);
  }
  return (
    <div className={stylo.container}>
     <button onClick={handleClickBuscar}>Buscar</button>
     {isBuscarShown && <Search />}
     <button onClick={handleClickOrdenar}>Ordenar</button>
     {isOrdenarShown && <div>asd</div>}
    </div>
  )
}

