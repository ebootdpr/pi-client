
import { ADD_ACTIVITY, CHANGE_BACKGROUND, DELETE_ACTIVITY, GET_DATA, LOADING } from "../actions"
const initialState =
{
  activities: [],
  countries: [],
  FiltredCountries: [],
  loading: false,
  currentPage: '1',
  selectedActivity: {},
  background: 'Other'

}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case CHANGE_BACKGROUND:
      return { ...state, background: action.payload }
    case GET_DATA:
      return { ...state, loading: false, ...action.payload }
    case ADD_ACTIVITY:
      return { ...state, loading: false, ...action.payload }
    case DELETE_ACTIVITY:
      // const listaFiltrada = state.actividades.filter(elem => action.payload !== elem.id)
      return { ...state }
    default:
      return { ...state }
  }
}

export default rootReducer
