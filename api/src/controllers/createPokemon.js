const { Pokemon, Type } = require("../db.js");
const axios = require ('axios')

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

const createPokemon = async ({ name, image, life, attack, defense, speed, height, weight, types }) => {

  //chekear en la base de datos que no se repita el nombre
  const existingPokemon = await Pokemon.findOne({ where: { name: name } });
  if(existingPokemon){throw Error ('Pokemon with this name already exists')}

  //chekear en la API que no exista un pokemon con ese nombre
  const response = await axios.get(`${baseUrl}${name.toLowerCase()}`);
  if (response.data) {throw Error('Pokemon with this name already exists');}
    

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
