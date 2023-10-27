const getPokemonById = require("../controllers/getPokemonById");

const getPokemonByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await getPokemonById(id);
    res.status(200).json(pokemon);
  } catch (error) {
    if (error.message === "Pokemon not found") {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = getPokemonByIdHandler;
