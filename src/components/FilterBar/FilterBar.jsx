import React from 'react'
import stylo from "./FilterBar.module.css"

export default function FilterBar() {
  return (
    <div className={stylo.container}>
     <div>Filtro</div>
     <button>Op</button>
     <div>Orden</div>
     <button>Op</button>
    </div>
  )
}

