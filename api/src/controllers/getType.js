const axios = require("axios");
const { Type } = require("../db.js");

const getTypes = async () => {

  const response = await axios.get("https://pokeapi.co/api/v2/type");
  const apiTypes = response.data.results;

  for (let typeData of apiTypes) {
    const typeName = typeData.name;
    
    const allType = await Type.findAll({ where: { name: typeName } });

    if (allType.length === 0) {
      await Type.create({ name: typeName });
    }
  }

  return await Type.findAll();
};

module.exports = getTypes;
