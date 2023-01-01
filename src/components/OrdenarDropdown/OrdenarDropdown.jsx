import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeOrder } from '../../redux/actions'



//un useState [] para recuperar orden actual
//un Dispatch al atributo de filtdado
//como hago para que se ponga un select especifico
//AGREGAR BOTOT PARA ACTIVAR FILTRADO
export default function OrdenarDropdown() {
    //currentOrder: { attribute: "name", order: "none" },

    const dispatch = useDispatch()
    const currentOrder = useSelector(state => state.currentOrder)
    const countries = useSelector(state => state.countries)
    const handleSelect = (e) => {
        dispatch(changeOrder( countries, e.target.value, currentOrder.order))
    }
    const handleClick = () => {
        let newOrder = 1
        if (currentOrder.order === 1) newOrder = -1;
        console.log(currentOrder.order)
        dispatch(changeOrder(countries, currentOrder.attribute, newOrder))
    }
    return (
        <div style={{display: 'inline'}}>
            <select defaultValue={currentOrder.attribute} onChange={handleSelect} name="atributoAOrdenar" >
                <option value="none">--Ordenar--</option>
                <option value="name">Nombre Pais</option>
                <option value="continents">Continente Pais</option>
                <option value="cca3">CCA3 Pais</option>
                <option value="capital">Capital Pais</option>
                <option value="subregion">Subregión Pais</option>
                <option value="flags">url Bandera Pais</option>
                <option value="population">Población Pais</option>
                <option value="area">area Pais</option>
                <option value="act_name">Nombre Actividad</option>
                <option value="act_season">Estación Actividad</option>
                <option value="act_difficulty">Dificultad Actividad</option>
                <option value="act_duration">Duración Actividad</option>
            </select>

        {currentOrder.attribute!=="none" ?<button onClick={handleClick} type="button">{ currentOrder.order === 1 ? 'ASC' : 'DESC'} </button>: null}
        </div>
    )
}
