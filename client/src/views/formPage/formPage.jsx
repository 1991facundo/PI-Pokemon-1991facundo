import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, fetchTypes } from "../../redux/actions";
import  {validations}  from "./validations";

const FormPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const handleInputChange = (e) => {
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validations(pokemon, types);

    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    dispatch(createPokemon(pokemon));
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    let newTypes = [...pokemon.types];

    if (newTypes.includes(selectedType)) {
      newTypes = newTypes.filter((type) => type !== selectedType);
    } else if (newTypes.length < 2) {
      newTypes.push(selectedType);
    } else {
      alert("Choose max 2 types");
      return;
    }

    setPokemon({
      ...pokemon,
      types: newTypes,
    });
  };

  const removeType = (typeToRemove) => {
    setPokemon({
      ...pokemon,
      types: pokemon.types.filter((type) => type !== typeToRemove),
    });
  };

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleInputChange}
          placeholder="Nombre"
          required
        />
        <input
          name="image"
          onChange={handleInputChange}
          placeholder="Imagen URL"
          required
        />
        <input
          name="life"
          type="number"
          onChange={handleInputChange}
          placeholder="Vida"
          required
        />
        <input
          name="attack"
          type="number"
          onChange={handleInputChange}
          placeholder="Ataque"
          required
        />
        <input
          name="defense"
          type="number"
          onChange={handleInputChange}
          placeholder="Defensa"
          required
        />
        <input
          name="speed"
          type="number"
          onChange={handleInputChange}
          placeholder="Velocidad"
        />
        <input
          name="height"
          type="number"
          onChange={handleInputChange}
          placeholder="Altura"
        />
        <input
          name="weight"
          type="number"
          onChange={handleInputChange}
          placeholder="Peso"
        />
        <select onChange={handleTypeChange}>
          <option value="">Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="selected-types">
          {pokemon.types.map((type, index) => (
            <span key={index} className="type" onClick={() => removeType(type)}>
              {type}
            </span>
          ))}
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default FormPage;
