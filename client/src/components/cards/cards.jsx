import { useSelector } from "react-redux";
import Card from "../Card/Card";

import "./cards.css";

const Cards = () => {
  const pokemons = useSelector((state) => state.pokemons);
  console.log("Pokemons: ", pokemons);

  return (
    <div className="cards-container">
      {pokemons.map((pokemon, index) => (
        <Card key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default Cards;
