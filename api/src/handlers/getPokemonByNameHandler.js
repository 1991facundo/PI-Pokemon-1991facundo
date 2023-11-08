const getPokemonByName = require("../controllers/getPokemonByName");

const getPokemonByNameHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const pokemon = await getPokemonByName(name);
    res.status(200).json(pokemon);
  } catch (error) {
   
    res.status(404).send("pokemon not found")
    }
    
};

module.exports = getPokemonByNameHandler;
