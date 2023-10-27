const axios = require("axios");
const { Type } = require("../db.js");

const getTypes = async () => {
  try {
    let types = await Type.findAll();

    if (types.length === 0) {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const apiTypes = response.data.results;

      for (let apiType of apiTypes) {
        await Type.create({ name: apiType.name });
      }

      types = await Type.findAll();
    }

    return types;
  } catch (error) {
    throw new Error("Server Error");
  }
};

module.exports = getTypes;
