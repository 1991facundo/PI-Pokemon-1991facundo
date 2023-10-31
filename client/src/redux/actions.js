import axios from "axios";

import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  SET_FILTERED_POKEMONS,
SET_SORTED_POKEMONS,
  SET_PAGE,
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


export const applyTypeFilter = () => {
  return (dispatch, getState) => {
    const allPokemons = [...getState().pokemons];
    const filteredPokemons = getState().typeFilter
      ? allPokemons.filter((pokemon) =>
          pokemon.types.includes(getState().typeFilter)
        )
      : allPokemons;

    dispatch({ 
      type: SET_FILTERED_POKEMONS, 
      payload: filteredPokemons });
  };
};


export const applyOriginFilter = () => {
  return (dispatch, getState) => {
    const allPokemons = [...getState().pokemons];
    let filteredPokemons;

    if (getState().originFilter === "api") {
      filteredPokemons = allPokemons.filter(
        (pokemon) => typeof pokemon.id === "number"
      );
    } else if (getState().originFilter === "db") {
      filteredPokemons = allPokemons.filter(
        (pokemon) => typeof pokemon.id === "string"
      );
    } else {
      filteredPokemons = allPokemons;
    }

    dispatch({ type: SET_FILTERED_POKEMONS, payload: filteredPokemons });
  };
};

export const applyOrder = () => {
  return (dispatch, getState) => {
    const pokemonsToSort = [...getState().filteredPokemons];
    let sortedPokemons;

    switch (getState().order) {
      case "name-asc":
        sortedPokemons = pokemonsToSort.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "name-desc":
        sortedPokemons = pokemonsToSort.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
      case "attack-asc":
        sortedPokemons = pokemonsToSort.sort((a, b) => a.attack - b.attack);
        break;
      case "attack-desc":
        sortedPokemons = pokemonsToSort.sort((a, b) => b.attack - a.attack);
        break;
      default:
        sortedPokemons = pokemonsToSort;
        break;
    }

    dispatch({ type: SET_SORTED_POKEMONS, payload: sortedPokemons });
  };
};

export const setPage = (pageNumber) => ({
  type: SET_PAGE,
  payload: pageNumber,
});
