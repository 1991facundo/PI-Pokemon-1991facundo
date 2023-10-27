import { FETCH, FILTER, SORT } from "./action-types";

export const fetchPokemons = (pokemons) => {
  return {
    type: FETCH,
    payload: pokemons,
  };
};

export const filterPokemons = (filterCriteria) => {
  return {
    type: FILTER,
    payload: filterCriteria,
  };
};

export const sortPokemons = (sortCriteria) => {
  return {
    type: SORT,
    payload: sortCriteria,
  };
};
