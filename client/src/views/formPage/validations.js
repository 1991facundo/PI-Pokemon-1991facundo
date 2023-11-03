export async function validations(pokemon, allTypes) {
  const errors = [];


  if (!pokemon.name.match(/^\D*$/)) {
    errors.push("Name should only contain letters.");
  }


  const numeric = [
    "life",
    "attack",
    "defense",
    "speed",
    "height",
    "weight",
  ];
  numeric.forEach((field) => {
    if (isNaN(Number(pokemon[field])) || Number(pokemon[field]) < 0) {
      errors.push(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be a positive number.`
      );
    }
  });

  if (pokemon.types.length > 2) {
    errors.push("You can select up to 2 types.");
  }

  pokemon.types.forEach((type) => {
    if (!allTypes.includes(type)) {
      errors.push(`${type} is not a valid type.`);
    }
  });


  return errors;
}
