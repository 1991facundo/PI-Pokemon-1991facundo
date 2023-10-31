
const getDB = (data) => {
  const formattedDbPokemons = data.map((poke) => ({
    id: poke.id,
    name: poke.name,
    image: poke.image,
    healthPoints: poke.life,
    attack: poke.attack,
    defense: poke.defense,
    speed: poke.speed,
    height: poke.height,
    weight: poke.weight,
    types: poke.types.map((type) => type.name),
  }));

  return formattedDbPokemons;
};

module.exports = getDB;
