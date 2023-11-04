import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchPokemons, fetchTypes } from "../../redux/actions";
import { validations } from "./validations";
import { Link } from "react-router-dom";

const FormPage = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState([]);

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

const [nameErrorMessage, setNameErrorMessage] = useState("");
const [isSuccessful, setIsSuccessful] = useState(false);



  const handleInputChange = async (e) => {
    // Si el nombre es el que se está cambiando, conviértelo a minúsculas
    const value =
      e.target.name === "name" ? e.target.value.toLowerCase() : e.target.value;

    setPokemon({
      ...pokemon,
      [e.target.name]: value,
    });

    const tempPokemon = {
      ...pokemon,
      [e.target.name]: value,
    };
    const newErrors = validations(tempPokemon, types);
    setErrors(newErrors);

    if (e.target.name === "name") {
      try {
        const response = await fetch(`/pokemons/name?name=${value}`);
        const message = await response.text();
        if (response.status === 400) {
          setNameErrorMessage(message);
        } else {
          setNameErrorMessage("");
        }
      } catch (error) {
        console.error("Error checking the name:", error);
      }
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validations(pokemon, types);
  setErrors(newErrors);

  if (!newErrors.length) {
    const response = await fetch("http://localhost:3001/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      setNameErrorMessage(errorMessage);
    } else {
      
      setIsSuccessful(true);
    }
  }
};

const handleOkClick = () => {
  dispatch(fetchPokemons());
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

  
    const tempPokemon = {
      ...pokemon,
      types: newTypes,
    };
    const newErrors = validations(tempPokemon, types);
    setErrors(newErrors);
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
          placeholder="Name"
          required
        />
        {nameErrorMessage && <span className="error">{nameErrorMessage}</span>}
        <input
          name="image"
          onChange={handleInputChange}
          placeholder="Image"
          required
        />
        <input
          name="life"
          type="number"
          onChange={handleInputChange}
          placeholder="Life"
          required
        />
        <input
          name="attack"
          type="number"
          onChange={handleInputChange}
          placeholder="Attack"
          required
        />
        <input
          name="defense"
          type="number"
          onChange={handleInputChange}
          placeholder="Defense"
          required
        />
        <input
          name="speed"
          type="number"
          onChange={handleInputChange}
          placeholder="Speed"
        />
        <input
          name="height"
          type="number"
          onChange={handleInputChange}
          placeholder="Height"
        />
        <input
          name="weight"
          type="number"
          onChange={handleInputChange}
          placeholder="Weight"
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
            <div key={index} className="type-container">
              <span className="type">{type}</span>
              <span className="close-type" onClick={() => removeType(type)}>
                X
              </span>
            </div>
          ))}
        </div>
        <div className="error-messages">
          {Array.isArray(errors) &&
            errors.map((error, index) => (
              <span key={index} className="error">
                {error}
              </span>
            ))}
        </div>

        {/* /*PREVIEW */}

        {pokemon.name && (
          <div className="card-preview">
            <div className="card-container">
              <img src={pokemon.image} alt={pokemon.image} />
              <h3>{pokemon.name}</h3>
              <p>Life: {pokemon.life}</p>
              <p>Attack: {pokemon.attack}</p>
              <p>Defense: {pokemon.defense}</p>
              <p>Speed: {pokemon.speed}</p>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <div>
                {pokemon.types.map((type, index) => (
                  <span key={index}>
                    {index !== 0 && " / "}
                    <span className="type-preview">{type}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        <button type="submit">Create</button>
        {isSuccessful && (
          <div>
            <span>Congratulations, you created a pokemon!</span>
            <Link to="/home" onClick={handleOkClick}>
              OK
            </Link>
          </div>
        )}

        <Link to="/home" onClick={handleOkClick}>
          <button>Close Creation Form</button>
        </Link>
      </form>
    </div>
  );
};


export default FormPage;