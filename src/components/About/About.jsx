import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div style={{color: "white", height: "100%"}}>
       <h1>Acerca de:</h1>
       <div>
        <h3>Paises</h3>
        <p>Muestra todos los paises, se puede buscar por nombre, tambien se pueden ordenar y filtrar segun 
          actividad, y otras.
        </p><br />
        <p>Al hacer Hover sobre cada pais se muestra a qué continente pertenece iluminando el fondo.</p> <br />
        <p>Al hacer click en un pais, accedemos a los detalles del mismo, ademas podemos asignarles actividades individualemnte</p>
        <h3>Actividades</h3>
        <h4>Crear</h4>
        <p>Permite crear una actividad y tambien permite eliminar una actividad de la base de datos</p>
        <h4>Asignar</h4>
        <p>Permite, elegir varias actividades, leugo, elegir varios paises, y asignarles las actividades elegidas a los paises elegidos</p>
       </div>
      </div>
    )
  }
}
