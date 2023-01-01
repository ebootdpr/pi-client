/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import CountryDraggable from '../CountryDraggable/CountryDraggable';
import { useHistory } from 'react-router-dom';
import stylo from "./BulkActivities.module.css"
BulkActivities.propTypes = {
    activityName: PropTypes.string,

}
function BulkActivities(props) {
    //agarra del store global, las actividades y los paises
    const activities = useSelector(store => store.activities)
    const countries = useSelector(store => store.countries)
    const [activitiesToAdd, setActivitiesToAdd] = useState([])
    const [paisesDisponibles, setpaisesDisponibles] = useState([])

    const [searchTerm, setSearchTerm] = useState("")
    //filtra los paises de tal forma que no se muestren los paises q ya tienen esa actividad
    useEffect(() => {
        console.log(countries.filter(pais => {
            if (pais.Activities.length !== 0) {
                return pais.Activities.some((activ) => activ.name === searchTerm)
            } else {
                return false
            }
        }))

        //buscador funciona
        setpaisesDisponibles(countries.filter(pais => {
            return (pais.name.toLowerCase().includes(searchTerm.toLowerCase()))
        }))
    }, [searchTerm])

    function handleChange(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <div className={stylo.container}>
            <div className={stylo.paisesaagregar}>
                Arrastre aqui los Paises a los que se agregaran la actividad
            </div>
            <div>
                <h1>Paises Disponibles</h1>
                <input placeholder='Buscar por nombre' value={searchTerm} name="busca" onChange={handleChange} type="text" />
                <div className={stylo.paisesdisponibles}>

                    {paisesDisponibles.map(obj =>
                        <CountryDraggable
                            filtered={true}
                            key={obj.cca3}
                            name={obj.name}
                            flags={obj.flags}
                            cca3={obj.cca3}
                            continents={obj.continents}
                        />
                    )}
                </div>
            </div>

        </div>
    )
}

export default BulkActivities
