import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SEARCH,
  FILTER,
  SORT,
  SET_PAGE,
} from "./action-types";


export const fetchRequest = () => ({
  type: FETCH_REQUEST,
})

export const fetchSuccess = () => ({
  type: FETCH_SUCCESS,
  payload: pokemons,
});

export const fetchFail = () => ({
  type: FETCH_FAIL,
  payload: error,
});

export const searchPokemon = (name) => ({
  type: SEARCH,
  payload: name,
});

export const filterPokemons = (filter) => ({
  type: FILTER,
  payload: filter,
});

export const sortPokemons = (sortCriteria) => ({
  type: SORT,
  payload: sortCriteria,
});

export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  payload: pageNumber,
});