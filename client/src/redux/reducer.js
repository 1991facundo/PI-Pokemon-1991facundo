import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SEARCH,
  FILTER,
  SORT,
  SET_PAGE,
  SET_CURRENT_POKEMON,
} from "./action-types";

const initialState = {
  pokemons: [],
  currentPokemon: null,
  loading: false,
  error: null,
  searchTerm: "",
  filter: {},
  sortCriteria: {},
  currentPage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

    case SET_CURRENT_POKEMON:
      return {
        ...state,
        currentPokemon: action.payload,
      };

    case FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case SORT:
      return {
        ...state,
        sortCriteria: action.payload,
      };

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
