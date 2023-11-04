export function validations(pokemon) {
  const errors = [];

  if (!pokemon.name.match(/^\D*$/)) {
    errors.push("Name should only contain letters.");
  }

  const specialNumeric = ["life", "attack", "defense"];

  specialNumeric.forEach((field) => {
    const value = Number(pokemon[field]);
    if (isNaN(value) || value < 0) {
      errors.push(
        `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } must be a positive number.`
      );
    }
    if (value > 110) {
      errors.push(
        `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed 110.`
      );
    }
    if (
      value === 110 &&
      (pokemon.life > 60 || pokemon.attack > 60 || pokemon.defense > 60)
    ) {
      errors.push(
        `If one of Life, Attack, or Defense is 110, the others cannot exceed 60.`
      );
    }
  });

  const sumOfValues = ["life", "attack", "defense"].reduce(
    (acc, field) => acc + Number(pokemon[field]),
    0
  );
  if (sumOfValues > 230) {
    errors.push(
      "The combined value of Life, Attack, and Defense cannot exceed 230."
    );
  }

  const otherNumeric = ["speed", "height", "weight"];
  otherNumeric.forEach((field) => {
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

  return Array.isArray(errors) ? errors : [];
}
