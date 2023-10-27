const axios = require("axios");
const getData = require("../utils/getData");
const { Pokemon } = require("../db.js");

const getPokemonById = async (id) => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  let localPokemon;

  if (isNaN(id)) {
    localPokemon = await Pokemon.findOne({ where: { id: id } });
  } else {
    localPokemon = await Pokemon.findOne({ where: { integerId: id } });
  }

  if (localPokemon) {
    return localPokemon;
  } else if (!isNaN(id)) {
    const getPokemonByIdResponse = await axios(`${baseUrl}/${id}`);
    const data = getPokemonByIdResponse.data;
    const filteredData = await getData(data);
    return filteredData;
  }

  throw new Error("Pokemon not found");
};

module.exports = getPokemonById;
