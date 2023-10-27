import { FETCH, FILTER, SORT } from "./action-types";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  sortedPokemons: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH:
      return {
        ...state,
        pokemons: action.payload,
      };

    case FILTER:
      return {
        ...state,
        
      };
    case SORT:
      return {
        ...state,
        
      };
    default:
      return state;
  }
};

export default reducer;