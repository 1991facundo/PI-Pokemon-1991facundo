const getPokemonByName = require("../controllers/getPokemonByName");

const getPokemonByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const pokemon = await getPokemonByName(name);
    res.status(200).json(pokemon);
  } catch (error) {
    if (error.message.includes("not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = getPokemonByNameHandler;
