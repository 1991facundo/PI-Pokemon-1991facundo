const { Pokemon, Type } = require("../db.js");
const axios = require ('axios')

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const createPokemon = async ({ name, image, life, attack, defense, speed, height, weight, types }) => {

  const existingPokemon = await Pokemon.findOne({ where: { name: name } });
  if(existingPokemon){throw Error ('Pokemon with this name already exists')}


  try {
    const response = await axios.get(`${baseUrl}${name.toLowerCase()}`);
    if (response.data) {
      throw Error("Pokemon with this name already exists");
    }
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      throw error;
    }
  }
    
    let typesInstances = [];
    
   for (let typeName of types) {
     let typeInstance = await Type.findOrCreate({ where: { name: typeName } });
     typesInstances.push(typeInstance[0]);
   }

    let newPokemon = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    await newPokemon.setTypes(typesInstances);

    return newPokemon;
 
};

module.exports = createPokemon;

