/* eslint-disable no-unused-vars */
import axios from "axios"
export const GET_DATA = 'GET_DATA'
export const PUSH_ACTIVITY = 'PUSH_ACTIVITY'
export const ADD_ACTIVITY = 'ADD_ACTIVITY'
export const ASSIGN_ACTIVITY = 'ASSIGN_ACTIVITY'
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY'
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY'
export const LOADING = 'LOADING'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'

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
        dispatch(getActivities(data.Sucess))
      })
      .catch(err => console.log(err));
  }
}
export function fetchCountries(obj) {
  console.log('f1');
  return async function (dispatch) {
    console.log('f2');
    dispatch(loading());
    await axios.get(`/countries`)
      .then(async res => await res.data)
      .then(data => {
        dispatch(getCountries(data.Sucess)) //yo hago que envie un objecto {Sucess: [pais,pais,pais,pais]}
      })
      .catch(err => console.log(err));
  }
}

export function fetchCountriesFiltered() {
  return async function (dispatch) {
    dispatch(loading());
    await axios.get(`/countries`)
      .then(async res => await res.data)
      .then(data => {
        dispatch(getCountries(data.Sucess)) //yo hago que envie un objecto {Sucess: [pais,pais,pais,pais]}
      })
      .catch(err => console.log(err));
  }
}
//action que retorna con payload 
export const getActivities = (array) => {
  return { type: GET_DATA, payload: { activities: array } }
}
export const loading = () => {
  return { type: LOADING }
}
export const getCountries = (array) => {
  return { type: GET_DATA, payload: { countries: array } }
}

export function addActivity(obj) {
  return async function (dispatch) {
    dispatch(loading());
    await axios.post(`/activities`, obj)
      .then(async res => await res.data)
      .then(data => {
        dispatch(fetchActivities())
      })
      .catch(err => console.log(err));
  }
}


export const pushActivity = (activity) => {
  return { type: PUSH_ACTIVITY, payload: activity }
}
export const deleteActivity = (id) => {
  return { type: DELETE_ACTIVITY, payload: id }
}