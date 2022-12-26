
import { CHANGE_BACKGROUND, CHANGE_SEARCHTERMS, DELETE_ACTIVITY, GET_DATA, LOADING, PUT_ACTIVITY } from "../actions"
const initialState =
{
  activities: [],
  countries: [],
  FiltredCountries: [],
  SearchTerms: {
    area: undefined,
    population: undefined,
    cca3: undefined,
    name: undefined,
    flags: undefined,
    continents: undefined,
    capital: undefined,
    subregion: undefined,
    act_name: undefined,
    act_season: undefined,
    act_duration: undefined,
    act_difficulty: undefined,
  },
  loading: false,
  currentPage: '1',
  selectedCountry: {},
  background: 'Other'

}
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case CHANGE_SEARCHTERMS:
      return { ...state, SearchTerms: action.payload }
    case CHANGE_BACKGROUND:
      return { ...state, background: action.payload }
    case GET_DATA:
      return { ...state, loading: false, ...action.payload }
    case DELETE_ACTIVITY:
      return { ...state, selectedCountry: { ...state.selectedCountry, Activities: state.selectedCountry.Activities.filter(ele => ele.name !== action.payload) } }
    case PUT_ACTIVITY:
      // eslint-disable-next-line no-case-declarations
      const nuevaListaDeActiviades = state.selectedCountry.Activities
      nuevaListaDeActiviades.push(state.activities.find(ele => ele.id === action.payload));
      return { ...state, selectedCountry: { ...state.selectedCountry, Activities: nuevaListaDeActiviades } }
    default:
      return { ...state }
  }
}

export default rootReducer
