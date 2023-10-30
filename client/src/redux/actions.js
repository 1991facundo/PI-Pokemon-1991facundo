import axios from "axios";

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

export const searchPokemon = (name) => {
  return async (dispatch) => {
    dispatch(fetchRequest());

    try {
      const response = await axios.get(
        `http://localhost:3001/pokemons/name?name=${name}`
      );
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      dispatch(fetchFail(error.message));
    }
  };
};


export const fetchPokemons = () => {
  return async (dispatch) => {
    dispatch(fetchRequest());

    try {
      const response = await axios.get(`http://localhost:3001/pokemons`);
      // console.log("Response Data: ", response.data); 
      dispatch(fetchSuccess(response.data));
    } catch (error) {
      // console.error("Fetch Error: ", error);
      dispatch(fetchFail(error.message));
    }
  };
};

export const setCurrentPokemon = (pokemon) => ({
  type: SET_CURRENT_POKEMON,
  payload: pokemon,
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
