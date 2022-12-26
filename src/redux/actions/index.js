/* eslint-disable no-unused-vars */
import axios from "axios"
export const GET_DATA = 'GET_DATA'
export const PUT_ACTIVITY = 'PUT_ACTIVITY'
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY'
export const LOADING = 'LOADING'
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
export const CHANGE_SEARCHTERMS = 'CHANGE_SEARCHTERMS'

// eslint-disable-next-line no-undef
axios.defaults.baseURL = process.env.REACT_APP_API;

function* idUnica() {
  let index = 0;
  while (true)
    yield index++;
}

export let id = idUnica();
const removeSpaces = str => str.replace(/\s/g, '');

export function changeBG(continent) {
  continent = removeSpaces(continent)
  return { type: CHANGE_BACKGROUND, payload: continent }
}

export function fetchActivities() {
  return async function (dispatch) {
    dispatch(loading());
    await axios.get(`/activities`)
      .then(async res => await res.data)
      .then(data => {
        dispatch(getActivities(data.data))
      })
      .catch(err => {
        if (err.response.data.data.length == 0)
          dispatch(getActivities([]))
        console.log(err.response.data.message)
      });
  }
}
export function fetchCountries(obj) {

  return async function (dispatch) {

    dispatch(loading());
    await axios.get(`/countries`)
      .then(async res => await res.data)
      .then(data => {
        dispatch(getCountries(data.data)) //yo hago que envie un objecto {Sucess: [pais,pais,pais,pais]}
      })
      .catch(err => {
        if (err.response.data.data.length == 0)
          dispatch(getCountries([]))
        console.log(err.response.data.message)
      });
  }
}

export function fetchByCCA3(string) {
  return async function (dispatch) {
    dispatch(loading());
    await axios.get(`/countries${string}`)
      .then(async res => await res.data)
      .then(data => {
        if (data.data.length === 0) data.data = [{}]
        dispatch({ type: GET_DATA, payload: { selectedCountry: data.data[0], selectedActivitiesID: data.data[0].Activities.map(ele => ele.name) } }) //yo hago que envie un objecto {Sucess: [pais,pais,pais,pais]}
      })
      .catch(err => console.log(err.response.data.message));
  }
}

export function fetchCountriesFiltered() {
  return async function (dispatch) {
    dispatch(loading());
    await axios.get(`/countries`)
      .then(async res => await res.data)
      .then(data => {
        dispatch(getCountries(data.data)) //yo hago que envie un objecto {Sucess: [pais,pais,pais,pais]}
      })
      .catch(err => console.log(err.response.data.message));
  }
}

export function addActivity(obj) {
  return async function (dispatch) {
    dispatch(loading());
    await axios.post(`/activities`, [obj])
      .then(async res => await res.data)
      .then(data => {
        dispatch(fetchActivities())
      })
      .catch(err => console.log(err.response.data.message));
  }
}

//[["JPN","CHE","BRA"],["3"]]
export function assignActivity(arrayPaisYactivityID) {
  return async function (dispatch) {
    dispatch(loading());
    await axios.put(`/activities`, arrayPaisYactivityID)
      .then(async res => await res.data)
      .then(data => {
        dispatch(putActivity(parseInt(arrayPaisYactivityID[1][0])))
      })
      .catch(err => console.log(err.response.data.message));
  }
}

export function deleteActivityGlobally(name) {
  return async function (dispatch) {
    dispatch(loading());
    await axios.delete(`/activities/all?name=${name}`)
      .then(async res => await res.data)
      .then(data => {
        dispatch(fetchActivities())
      })
      .catch(err => dispatch(fetchActivities()));
  }
}

export function deleteActivityLocally(name, cca3) {
  return async function (dispatch) {
    dispatch(loading());
    await axios.delete(`/activities?name=${name}&cca3=${cca3}`)
      .then(async res => await res.data)
      .then(data => {
        dispatch(deleteActivity(name))
      })
      .catch(err => console.log(err.response.data.message));
  }
}
//action que retorna con payload 
export const getActivities = (array) => {
  return { type: GET_DATA, payload: { activities: array } }
}

export const getCountries = (array) => {
  return { type: GET_DATA, payload: { countries: array } }
}
export const loading = () => {
  return { type: LOADING }
}

export const changeSearchterms = (obj) => {
  return { type: CHANGE_SEARCHTERMS, payload: obj }
}
export const deleteActivity = (name) => {
  return { type: DELETE_ACTIVITY, payload: name }
}
export const putActivity = (id) => {

  return { type: PUT_ACTIVITY, payload: id }
}
