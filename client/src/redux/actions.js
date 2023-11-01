import axios from "axios";

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  RESET_FILTERED_POKEMONS,
  SET_SORTING_CRITERIA,
SET_SORTING_DIRECTION,
  SET_PAGE,
} from "./action-types";

/*----------FETCH POKEMONS HOME PAGE----------*/

export const fetchRequest = () => ({
  type: FETCH_REQUEST,
});

export const fetchSuccess = (pokemons) => ({
  type: FETCH_SUCCESS,
  payload: pokemons,
});

export const fetchFail = (errorMessage) => ({
  type: FETCH_FAIL,
  payload: errorMessage,
});

export const fetchPokemons = () => {
  return async (dispatch) => {
    dispatch(fetchRequest());

    try {
      const response = await axios.get(`http://localhost:3001/pokemons`);
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      dispatch(fetchFail(error.message));
    }
  };
};

/*----------SEARCH POKEMONS----------*/

export const searchPokemon = (name) => {
  return async (dispatch) => {
    dispatch(fetchRequest());

    try {
      const response = await axios.get(
        `http://localhost:3001/pokemons/name?name=${name}`
      );
      console.log("Response data:", response.data);
      dispatch(
        fetchSuccess(
          Array.isArray(response.data) ? response.data : [response.data]
        )
      );
    } catch (error) {
      dispatch(fetchFail(error.message));
    }
  };
};

/*----------FILTER POKEMONS----------*/


export const filterByOrigin = (origin) => ({
  type: FILTER_BY_ORIGIN,
  payload: origin,
});

export const resetFilteredPokemons = () => ({
  type: RESET_FILTERED_POKEMONS,
});

export const filterByType = (pokemonType) => ({
  type: FILTER_BY_TYPE,
  payload: pokemonType,
});

/*----------ORDER POKEMONS----------*/

export const setSortingCriteria = (criteria) => ({
  type: SET_SORTING_CRITERIA,
  payload: criteria,
});

export const setSortingDirection = (direction) => ({
  type: SET_SORTING_DIRECTION,
  payload: direction,
});

export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  payload: pageNumber,
});
