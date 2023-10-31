import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  RESET_FILTERED_POKEMONS,
  SET_PAGE,
} from "./action-types";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  isFiltered: false,
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

    /*FILTRADO*/
    case FILTER_BY_TYPE:
      return {
        ...state,
        isFiltered: true,
        filteredPokemons: state.pokemons.filter(
          (pokemon) =>
            pokemon.types &&
            pokemon.types.some((type) =>
              typeof type === "string"
                ? type === action.payload
                : type.name === action.payload
            )
        ),
      };

    case FILTER_BY_ORIGIN:
      let filteredByOrigin;
      if (action.payload === "API") {
        filteredByOrigin = state.pokemons.filter(
          (pokemon) => typeof pokemon.id === "number"
        );
      } else if (action.payload === "DB") {
        filteredByOrigin = state.pokemons.filter(
          (pokemon) => typeof pokemon.id === "string"
        );
      }
      return {
        ...state,
        isFiltered: true,
        filteredPokemons: filteredByOrigin,
      };

    case RESET_FILTERED_POKEMONS:
      return {
        ...state,
        isFiltered: false,
        filteredPokemons: [],
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
