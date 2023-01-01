import {
    //#region 
    CHANGE_BACKGROUND,
    CHANGE_ORDER,
    CHANGE_PAGE,
    CHANGE_SEARCHTERMS,
    LOADING_FAILED,
    DELETE_ACTIVITY,
    DISPLAY_ERROR,
    GET_ACTIIVITIES,
    GET_COUNTRIES,
    GET_COUNTRY_BY_ID,
    HIDE_ERROR,
    LOADING,
    PUT_ACTIVITIES,
    SET_QUERYS,
    FILTROS_ACTIVOS,
    VER_FILTROS,
    UPDATE_SHOWABE_COUNTRIES,
    UPDATE_FILTERED_COUNTRIES,
    BULK_CREATE,
    //#endregion
} from "../actions";
const initialState = {
    //#region  BORRAR DEPRECATED

    querys: "",
    SearchTerms: {
        area: "",
        population: "",
        cca3: "",
        name: "",
        flags: "",
        continents: "",
        capital: "",
        subregion: "",
        act_name: "",
        act_season: "",
        act_duration: "",
        act_difficulty: "",
    },
    currentOrder: { attribute: "none", order: 1 },
    //#endregion
    //#region sore inicial
    activities: [],             //traigo todas las actividades de la DB
    countries: [],              //traigo todos los paises de la DB
    filteredCountries: [],      //Almacena los paises filtrados, por cada dispatch se vuelve a rellenar desde 0 con nuevos paises
    filtrosActivos: {},
    showableCountries: [],      //estos son los paises q deben mostrarse segun la pagina actual, DEPRECATED probalby
    currentPage: 1, 
    selectedCountry: {},        //Paise seleccionado para CountryDetails
    background: "Other",        //Fondo vacio
    displayFilters: false,      //Ver Lista de filtros?
    loading: false,             //Ver pantalla cargando?
    displayError: false,        //Ver error
    errorMessage: "",         //Mensaje del error
    bulkCreateMode: false,
    //#endregion
};
function rootReducer(state = initialState, action) {
    switch (action.type) {

        //#region 
        case BULK_CREATE:
            return {...state, bulkCreateMode:action.payload}
        //#endregion
//#region --  ERROR LOADING  --  ERROR LOADING  --  ERROR LOADING  --  ERROR LOADING  --  ERROR LOADING  --  
        case LOADING:
            return { ...state, loading: true };
        case LOADING_FAILED:
            return { ...state, loading: false };
        case DISPLAY_ERROR:
            return { ...state , displayError: true, errorMessage: action.payload };
        case HIDE_ERROR:
            return { ...state, loading: false, displayError: false };
//#endregion
//#region --  PAGINACIÓN  --  PAGINACIÓN  --  PAGINACIÓN  --   PAGINACIÓN   --  PAGINACIÓN   PAGINACIÓN
        case CHANGE_PAGE:
            return { ...state, currentPage: action.payload };
        case UPDATE_SHOWABE_COUNTRIES:
            return { ...state, showableCountries: action.payload };
//#endregion
//#region --  AXIOS RESPONSES  --  AXIOS RESPONSES  --  AXIOS RESPONSES  --  AXIOS RESPONSES  --  AXIOS RESPONSES 
        case GET_COUNTRIES:
            return { ...state, loading: false, countries: action.payload };
            case GET_COUNTRY_BY_ID:
                return {...state,loading:false, selectedCountry: action.payload}
        case GET_ACTIIVITIES:
            return { ...state, loading: false, activities: action.payload };
        case DELETE_ACTIVITY:
            return {
                ...state,loading: false, selectedCountry: {
                    ...state.selectedCountry, Activities: state.selectedCountry.Activities.filter(
                        (ele) => ele.name !== action.payload
                    ),
                },
            };
        case PUT_ACTIVITIES:
            // eslint-disable-next-line no-case-declarations
            const nuevaListaDeActiviades = state.selectedCountry.Activities;
            nuevaListaDeActiviades.push(
                state.activities.find((ele) => ele.id === action.payload)
            );
            return {
                ...state,loading: false,
                selectedCountry: {
                    ...state.selectedCountry,
                    Activities: nuevaListaDeActiviades,
                },
            };
//#endregion
//#region --  FILTRADOS  --  FILTRADOS -- FILTRADOS  -- FILTRADOS  --  FILTRADOS  --  FILTRADOS
        case UPDATE_FILTERED_COUNTRIES:
            return {...state, filteredCountries: action.payload}
        case FILTROS_ACTIVOS:
            return{...state, filtrosActivos: action.payload}
//#endregion
//#region -- ORDENAMIENTO ASCENDENTE O DESCENDENTE
//#endregion
//#region FILTRADOS BACKEND -- NO UTILIZADOS
case CHANGE_SEARCHTERMS:
            return {
                ...state,
                SearchTerms: { ...state.SearchTerms, ...action.payload },
            };
        case CHANGE_ORDER:
            return {
                ...state,
                currentOrder: {
                    attribute: action.payload.atributoAOdenar,
                    order: action.payload.orden,
                },
            };
        case SET_QUERYS:
            return { ...state, querys: action.payload };
        case CHANGE_BACKGROUND:
            return { ...state, background: action.payload };

        case VER_FILTROS:
            return { ...state, displayFilters: !state.displayFilters };
//#endregion
        default:
            return { ...state };
    }
}

export default rootReducer;
