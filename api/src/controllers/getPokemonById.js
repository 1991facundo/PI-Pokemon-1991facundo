const axios = require("axios");
const getData = require("../utils/getData");
const { Pokemon, Type } = require("../db.js");

const getPokemonById = async (id) => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  let localPokemon;

  if (isNaN(id)) {
    localPokemon = await Pokemon.findOne({ where: { id: id }, include: Type });
  } 

  if (localPokemon) {
    const localPokemonJSON = localPokemon.toJSON(); 
    localPokemonJSON.types = localPokemon.types.map((type) => type.name); 
    return localPokemonJSON; 
  } else if (!isNaN(id)) {
    const getPokemonByIdResponse = await axios(`${baseUrl}/${id}`);
    const data = getPokemonByIdResponse.data;
    const filteredData = await getData(data);
    return filteredData;
  }

  throw new Error("Pokemon not found");
};

module.exports = getPokemonById;
