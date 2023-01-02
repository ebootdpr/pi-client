/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities, updateActiveFilters, updateFilteredCountries, verFiltros, setOrder, fetchCountries } from "../../redux/actions";
import stylo from "./FilterBar.module.css";

export default function FilterBar() {
    const dispatch = useDispatch();
    const countries = useSelector(store => store.countries)
    const filtrosActivos = useSelector(store => store.filtrosActivos)
    const currentOrder = useSelector(store => store.currentOrder)
    const handleClickClose = () => {
        dispatch(verFiltros());
    };


    //ORDENAR COUNTRIES DIRECTAMENTE
    //cómo? usando un estado local, no es necesario
    //Y cada ves q se active un filtro, se hagaa un dispatch, (useEffect)
    /*                     _____________________________
            *             |  __________   __________   |
            *             | |          | |          |  |
            *COUNTRY ---> | | FILTRO 1 | | FILTRO 2 |  |---> dispatch(updateFilteredCountries(array));         
            *             | |__________| |__________|  |
            *             |____________________________|      
       Estrictura de dato 
        ObjetoDeFunciones = {continents: function (array) {
            return {newArray: [.], value: ".", attribute: "."}}}
        Filtro toma ObjetoDeFunciones y ejecuta cada funcion que tenga dentro
        pasandole el valor ya procesado al siguiente.



        */
    function closureFiltradoAlfabetico(attribute, value) {
        return function(array) {
            return {
                newArray: value === "" ? array : array.filter(pais => {
                    return pais[attribute] ? pais[attribute].toLowerCase().includes(value.toLowerCase()) : array
                }),
                value: value,
                attribute: attribute
            }
        }
    }
    useEffect(() => {

        dispatch(fetchActivities());
    }, [])


    useEffect(() => {
        const stackDeFiltros = Object.keys(filtrosActivos)
        function filtradoRecursivo(array) {
            if (stackDeFiltros.length === 0) return array
            return filtradoRecursivo(filtrosActivos[stackDeFiltros.pop()](array).newArray)
        }
        const paisesFiltrados = filtradoRecursivo(countries)
        dispatch(updateFilteredCountries(paisesFiltrados));
    }, [filtrosActivos])

    function handleChange(e) {
        e.preventDefault();
        console.log(currentOrder)
        dispatch(updateActiveFilters({
            ...filtrosActivos,
            [e.target.name]: closureFiltradoAlfabetico(e.target.name, e.target.value)
        }))
    }
    const activities = useSelector(store => store.activities)
    let displayableActivities = activities.map(activiity => {
        return <option key={activiity.name} value={activiity.name}>{activiity.name}</option>
    })
    function handleChangeActivity(e) {

        const funcionFiltradora = (array) => {
            return {
                newArray: e.target.value === "" ? array :
                    array.filter(pais => pais.Activities.some(Act => Act.name === e.target.value)),
                value: e.target.value,
                attribute: e.target.name
            }
        }
        dispatch(updateActiveFilters({ ...filtrosActivos, [e.target.name]: funcionFiltradora }))
    }
    function limpiarFiltros() {
        dispatch(updateActiveFilters({}))
        dispatch(updateFilteredCountries(countries));
    }

    function handleChangeOrder(e) {
        //ACTION: setOrder = (atributoAOdenar, orden) => {
        const [attributo, orden] = e.target.value.split(" ");
        dispatch(setOrder(attributo, parseInt(orden)))
    }
    return (
        <div>
            <div className={stylo.container}>
                <select name="orden"
                    onChange={handleChangeOrder}
                    value={`${currentOrder.attribute} ${currentOrder.order}` || "name 1"}
                >

                    <option value="name 1">Ordenado por: Nombre Ascendente</option>
                    <option value="name -1">Ordenado por: Nombre Descendente</option>
                    <option value="population 1">Ordenado por: Población Ascendente</option>
                    <option value="population -1">Ordenado por: Población Descendente</option>
                    <option value="area 1">Ordenado por: Área Ascendente</option>
                    <option value="area -1">Ordenado por: Área Descendente</option>
                </select>
                <select name="Activities"
                    onChange={handleChangeActivity}
                    value={filtrosActivos.Activities ? filtrosActivos.Activities([]).value : ""}

                >

                    <option value="">Filtar por Actividad</option>
                    {displayableActivities}
                </select>
                <select name="continents"
                    onChange={handleChange}
                    value={filtrosActivos.continents ? filtrosActivos.continents([])?.value : ""}
                >

                    <option value="">Filtrar por Continente</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Africa">Africa</option>
                </select>
                <hr></hr>
                <input
                    type="text"
                    name="cca3"
                    placeholder="Buscar por CCA3"
                    value={typeof filtrosActivos.cca3 === 'function' ? filtrosActivos?.cca3([])?.value || "" : ""}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="capital"
                    placeholder="Buscar por capital"
                    value={typeof filtrosActivos.capital === 'function' ? filtrosActivos?.capital([])?.value || "" : ""}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="subregion"
                    placeholder="Buscar por subregion"
                    value={typeof filtrosActivos.subregion === 'function' ? filtrosActivos.subregion([])?.value || "" : ""}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="flags"
                    placeholder="Buscar por url bandera"
                    value={typeof filtrosActivos.flags === 'function' ? filtrosActivos.flags([])?.value || "" : ""}
                    onChange={handleChange} />
                <hr></hr>
                <button onClick={handleClickClose}>CERRAR</button>
                <button onClick={limpiarFiltros}>LIMPIAR FILTROS</button>
            </div>
        </div>
    );
}
