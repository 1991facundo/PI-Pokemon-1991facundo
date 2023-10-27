const createPokemon = require("../controllers/createPokemon.js");
const { Pokemon, Type } = require("../db.js");


const createPokemonHandler = async (req, res) => {
  const { name, image, life, attack, defense, speed, height, weight, types } =
    req.body;

  if (!name || !image || !life || !attack || !defense || !types) {
    return res.status(400).send("Missing or invalid data");
  }

  try {
    const newPokemon = await createPokemon({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    });

    const createdPokemon = await Pokemon.findByPk(newPokemon.id, {
      include: Type,
    });

    const filteredType = {
      ...createdPokemon.toJSON(),
      types: createdPokemon.types.map((type) => type.name),
    };

    res.status(200).json(filteredType);
  } catch (error) {
    if (error.message === "Pokemon with this name already exists") {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }

};

module.exports = createPokemonHandler;

