/* eslint-disable no-unused-vars */
import axios from "axios"

//countries
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRY_BY_ID = 'GET_COUNTRY_BY_ID'

//activities
export const GET_ACTIIVITIES = 'GET_ACTIIVITIES'
export const PUT_ACTIVITIES = 'PUT_ACTIVITY'
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY'

//Booleanos (de condicion binaria)
export const BULK_CREATE = 'BULK_CREATE'
export const LOADING = 'LOADING'
export const LOADING_FAILED = 'LOADING_FAILED'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'
export const VER_FILTROS = 'VER_FILTROS'

//Integerianos (de condicion limitada multiple)
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'

//filtracion y  paginacion
export const UPDATE_SHOWABE_COUNTRIES = 'UPDATE_SHOWABE_COUNTRIES'
export const UPDATE_FILTERED_COUNTRIES = 'UPDATE_FILTERED_COUNTRIES'
export const FILTROS_ACTIVOS = 'FILTROS_ACTIVOS'

//#region DEPRECATED: debido a que no se debe hacer en el backend.
export const SET_QUERYS = 'SET_QUERYS'
export const GET_DATA = 'GET_DATA'
export const CHANGE_ORDER = 'CHANGE_ORDER'
export const CHANGE_SEARCHTERMS = 'CHANGE_SEARCHTERMS'
//#endregion


// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_URL;

function* idUnica() {
    let index = 0;
    while (true)
        yield index++;
}

export let id = idUnica();
const removeSpaces = str => str.replace(/\s/g, '');

//#region ACTIONS CON DELAY (ASYNC AWAIT) que ejecutan otras actions
/** Hover Country cambia Background
 * 
 * @param {string} continent debe ser uno continente valido (Verano Otoño Primavera Invierno)
 * @returns un dispatch que el reducer cambia el estado background a ${continent}
 */
export function changeBG(continent) {
    continent = removeSpaces(continent)
    return { type: CHANGE_BACKGROUND, payload: continent }
}

/** Obtiene todas las actividades
 * hace un axios a la API
 * @returns un resuelve getActivities que devuelve un dispatch o hace un dispatch de display error
 */
export function fetchActivities() {
    return async function(dispatch) {
        dispatch(loading());
        await axios.get(`/activities`)
            .then(async res => await res.data)
            .then(data => {
                dispatch(getActivities(data.data))
            })
            .catch(err => {
                dispatch(getActivities([]))
                dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message })
            });
    }
}

/**DEPRECATED: Ya que el PI pide no hacer los filtros en el frontend y no en el backend.
 * 
 * @param {string} querys 
 * @returns 
 */
export function fetchCountriesFiltered(querys) { //ahcerlo en el reducer
    return async function(dispatch) {
        dispatch(loading());
        await axios.get(`/countries` + querys)
            .then(async res => await res.data)
            .then(data => {
                dispatch(getCountries(data.data)) //yo hago que envie un objecto {Sucess: [pais,pais,pais,pais]}
            })
            .catch(err => {
                dispatch(getCountries([]))
                dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message })
            });
    }
}
/**Toma todos los paises de la DB
 * 
 * @returns dispatch de los paises encontrados con lo q retorne getCountries
 */
export function fetchCountries() {
    return async function(dispatch) {
        dispatch(loading());
        await axios.get(`/countries`)
            .then(async res => await res.data)
            .then(data => {
                for (const pais of data.data) {
                    if (!isNaN(pais.area)) {
                        pais.area = parseInt(pais.area)
                    } else {
                        pais.area = 0
                    }
                    if (!isNaN(pais.population)) {
                        pais.population = parseInt(pais.population)
                    }else{
                     pais.population = 0
                    }
                }
                dispatch(getCountries(data.data)) //objecto {Sucess: true, data: [pais,pais,pais,pais]}
                dispatch(updateFilteredCountries(data.data))
            })
            .catch(err => {
                dispatch(getCountries([]))
                dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message })
            });
    }
}

/** Obtiene pais por CCA3 {GET_COUNTRY_BY_ID}
 * @param {string} query 
 * @returns dispatch directo
 */
export function fetchByCCA3(query) {
    return async function(dispatch) {
        dispatch(loading());
        await axios.get(`/countries${query}`)
            .then(async res => await res.data)
            .then(data => {
                if (data.data.length === 0) data.data = [{}] //hotfix
                dispatch({ type: GET_COUNTRY_BY_ID, payload: data.data[0] }) //yo hago que envie un objecto {Sucess: [pais,pais,pais,pais]}
            })
            .catch(err => dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message }));
    }
}


/**Crea una nueva actividad en la DB y hace un refetch de actividades
 * 
 * @param {Object} obj 
 * @returns hace un fetch de todas las actividades
 */
export function addActivity(obj) {
    return async function(dispatch) {
        dispatch(loading());
        await axios.post(`/activities`, [obj])
            .then(async res => await res.data)
            .then(data => {
                dispatch(fetchActivities())
            })
            .catch(err => dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message }));
    }
}

//[["JPN","CHE","BRA"],["3"]]
/**Asocia un conjunto de actividades a un conjunto de paises
 * 
 * @param {*} arrayPaisYactivityID 
 * @returns 
 */
export function assignActivity(arrayPaisYactivityID) {
    return async function(dispatch) {
        dispatch(loading());
        await axios.put(`/activities`, arrayPaisYactivityID)
            .then(async res => await res.data)
            .then(data => {
                if(arrayPaisYactivityID[0].length === 1 && arrayPaisYactivityID[1].length ===1)
                dispatch(putActivity(parseInt(arrayPaisYactivityID[1][0])))
                else
                dispatch(fetchCountries())
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message })});
    }
}

export function deleteActivityGlobally(name) {
    return async function(dispatch) {
        dispatch(loading());
        await axios.delete(`/activities/all?name=${name}`)
            .then(async res => await res.data)
            .then(data => {
                dispatch(fetchActivities())
            })
            .catch(err => dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message }));
    }
}

export function deleteActivityLocally(name, cca3) {
    return async function(dispatch) {
        dispatch(loading());
        await axios.delete(`/activities?name=${name}&cca3=${cca3}`)
            .then(async res => await res.data)
            .then(data => {
                dispatch(deleteActivity(name))
            })
            .catch(err => dispatch({ type: DISPLAY_ERROR, payload: err.response.data.message }));
    }
}
//#endregion
//#region  ACTIONS PURAS
export const getActivities = (array) => {
    return { type: GET_ACTIIVITIES, payload: array }
}

export const getCountries = (array) => {
    return { type: GET_COUNTRIES, payload: array }
}
export const loading = () => {
    return { type: LOADING }
}
export const bulkCreate = (booleano) => {
    return { type: BULK_CREATE, payload: booleano }
}

export const changeSearchterms = (obj) => {
    return { type: CHANGE_SEARCHTERMS, payload: obj }
}
export const deleteActivity = (name) => {
    return { type: DELETE_ACTIVITY, payload: name }
}
export const putActivity = (id) => {

    return { type: PUT_ACTIVITIES, payload: id }
}
export const verFiltros = () => {
    return { type: VER_FILTROS }
}
export const changeOrder = (countries, atributoAOdenar, orden) => {
    return function(dispatch) {
        dispatch(setOrder(atributoAOdenar, orden))
        dispatch(getCountries(countries))
    }
}
export const setOrder = (atributoAOdenar, orden) => {
    return { type: CHANGE_ORDER, payload: { atributoAOdenar, orden } }
}
export const setQuerys = (querys) => {
    return { type: SET_QUERYS, payload: querys }
}
export const hideError = () => {
    return { type: HIDE_ERROR }
}
export const updateShowableCountries = (newShowabeCountries) => {
    return { type: UPDATE_SHOWABE_COUNTRIES, payload: newShowabeCountries }
}
export const updateFilteredCountries = (newFilteredCountries) => {
    return { type: UPDATE_FILTERED_COUNTRIES, payload: newFilteredCountries }
}
export const updateActiveFilters = (object) => {
    return { type: FILTROS_ACTIVOS, payload: object }
}
export const updateCurrentPage = (newPage) => {
    return { type: CHANGE_PAGE, payload: newPage }
}
//#endregion
