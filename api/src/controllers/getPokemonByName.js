const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon, Type } = require("../db.js");
const getData = require("../utils/getData");

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonByName = async (name) => {
  try {
    const lowerCase = name.toLowerCase();

    const localPokemons = await Pokemon.findAll({
      where: {
        name: {
          [Op.iLike]: `%${lowerCase}%`,
        },
      },
      include: [Type],
    });

    if (localPokemons && localPokemons.length > 0) {
      return localPokemons;
    } else {
      const getPokemonByName = await axios(`${baseUrl}${lowerCase}`);
      const data = getPokemonByName.data;
      const filteredData = await getData(data);

      return filteredData;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getPokemonByName;
