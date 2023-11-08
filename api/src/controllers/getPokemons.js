const axios = require("axios");
const getData = require("../utils/getData");
const getDB = require("../utils/getDB");
const { Pokemon, Type } = require("../db.js");

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const getPokemons = async () => {
  let allPokemonsApi = [];
  let endpoint = baseUrl;

  while (allPokemonsApi.length < 60) {
    const response = await axios.get(endpoint);
    allPokemonsApi.push(...response.data.results);
    endpoint = response.data.next;
  }

  const pokemonPromises = allPokemonsApi
    .slice(0, 60)
    .map((poke) => axios.get(poke.url));
  const pokemonResponses = await Promise.all(pokemonPromises);
  const apiPokemons = await Promise.all(
    pokemonResponses.map((response) => getData(response.data))
  );

  const dbPokemons = await Pokemon.findAll({ include: Type });
  const dbPokemonsFiltered = getDB(dbPokemons);

  const allPokemons = [...dbPokemonsFiltered, ...apiPokemons];

  return allPokemons;
};

module.exports = getPokemons;