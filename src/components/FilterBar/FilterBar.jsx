import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveFilters, updateFilteredCountries, verFiltros } from "../../redux/actions";
import stylo from "./FilterBar.module.css";

export default function FilterBar() {
    const dispatch = useDispatch();
    const countries = useSelector(store => store.countries)
    const filtrosActivos = useSelector(store => store.filtrosActivos)
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
            *             |____________________________|        */

    function setNewFilter() {
        let array = countries
        for (let attr of Object.keys(filtrosActivos)) {
            if (filtrosActivos[attr] !== '') {
                array = array.filter(pais => {
                    if (!isNaN(pais[attr])) return `${pais[attr]}`.includes(filtrosActivos[attr])
                    return pais[attr].toLowerCase().includes(filtrosActivos[attr].toLowerCase())
                })
            }
        }
        dispatch(updateFilteredCountries(array));
    }
    useEffect(() => {
        setNewFilter()
    }, [filtrosActivos])
    function handleChange(e) {
        e.preventDefault();
        dispatch(updateActiveFilters({ ...filtrosActivos, [e.target.name]: e.target.value }))

    }

    return (
        <div>
            <div className={stylo.container}>
                <select name="continents" defaultValue={filtrosActivos.continents || ""} onChange={handleChange}>
                    <option value="">Todos los Continentes</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Africa">Africa</option>
                </select>
                <input
                    type="text"
                    name="cca3"
                    placeholder="Buscar por CCA3"
                    value={filtrosActivos.cca3 || ""}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="capital"
                    placeholder="Buscar por capital"
                    value={filtrosActivos.capital || ""}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="subregon"
                    placeholder="Buscar por subregion"
                    value={filtrosActivos.subregion || ""}
                    onChange={handleChange} />
                <input
                    type="text"
                    name="flags"
                    placeholder="Buscar por url bandera"
                    value={filtrosActivos.flags || ""}
                    onChange={handleChange} />
        <button onClick={handleClickClose}>X</button>
            </div>
        </div>
    );
}
