import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_TYPES,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  RESET_FILTERED_POKEMONS,
  SET_SORTING_CRITERIA,
  SET_SORTING_DIRECTION,
  SET_PAGE,
  CREATE_POKEMON,
} from "./action-types";

/* INITIAL STATES */

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  types: [],
  isFiltered: false,
  loading: false,
  error: null,
  searchTerm: "",
  sortingCriteria: "null",
  sortingDirection: "asc",
  currentPage: 1,
};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    /*POKEMON INFO*/

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

    /*FILTER*/

    case SET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

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

    /* SORTING */

    case SET_SORTING_CRITERIA:
     
      return {
        ...state,
        sortingCriteria: action.payload,
      };

    case SET_SORTING_DIRECTION:

      return {
        ...state,
        sortingDirection: action.payload,
      };

    /* PAGINATED */

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    /* FORM */

    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
