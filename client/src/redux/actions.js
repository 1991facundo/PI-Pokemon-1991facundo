import axios from "axios";

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
     
      dispatch(
        fetchSuccess(
          Array.isArray(response.data) ? response.data : [response.data]
        )
      );
      dispatch(setPage(1));
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

export const setTypes = (types) => ({
  type: SET_TYPES,
  payload: types,
});

export const fetchTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/pokemons/type`);
      const types = response.data.map((typeObj) => typeObj.name);
      dispatch(setTypes(types));
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };
};

export const filterByType = (pokemonType) => ({
  type: FILTER_BY_TYPE,
  payload: pokemonType,
});

export const resetFilteredPokemons = () => ({
  type: RESET_FILTERED_POKEMONS,
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

/*----------PAGINATED----------*/

export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  payload: pageNumber,
});

/*----------FORM----------*/

export const createPokemon = (pokemonData) => async (dispatch) => {
  dispatch({ type: CREATE_POKEMON, payload: pokemonData });

  try {
    await axios.post("http://localhost:3001/pokemons", pokemonData);
  } catch (error) {
    console.error("Error creating Pokemon", error);
  }
};
