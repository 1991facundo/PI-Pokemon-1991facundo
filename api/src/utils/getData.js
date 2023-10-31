const getData = async (data) => {
  const typesNames = data.types.map((type) => type.type.name);

  const hpStat = data.stats.find((stat) => stat.stat.name === "hp");
  const hpPoints = hpStat.base_stat;

  const attackStat = data.stats.find((stat) => stat.stat.name === "attack");
  const attackPoints = attackStat.base_stat;

  const defenseStat = data.stats.find((stat) => stat.stat.name === "defense");
  const defensePoints = defenseStat.base_stat;

  const speedStat = data.stats.find((stat) => stat.stat.name === "speed");
  const speedPoints = speedStat.base_stat;

  let image = data.sprites.other.home.front_default;
  if (image === null) {
    image = data.sprites.other["official-artwork"].front_default;
  }

  const obj = {
    id: data.id,
    name: data.name,
    image: image,
    healthPoints: hpPoints,
    attack: attackPoints,
    defense: defensePoints,
    speed: speedPoints,
    height: data.height,
    weight: data.weight,
    types: typesNames,
  };

  if (!obj) throw new Error("Error getting data");
  return obj;
};

module.exports = getData;