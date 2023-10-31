import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SEARCH,
  SET_FILTERED_POKEMONS,
  SET_SORTED_POKEMONS,
  SET_PAGE,
} from "./action-types";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  loading: false,
  error: null,
  searchTerm: "",
  currentPage: 1,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    /*TRAER LA INFO PARA RENDERIZARLA*/
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemons: action.payload,
      };
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEARCH:
      return {
        ...state,
        searchTerm: action.payload,
      };

    /* FILTRO Y ORDENAMIENTO */

    case SET_FILTERED_POKEMONS:
      return {
        ...state,
        filteredPokemons: action.payload,
      };

    case SET_SORTED_POKEMONS:
      return {
        ...state,
        sortedPokemons: action.payload,
      };

    /* PAGINADO */

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
