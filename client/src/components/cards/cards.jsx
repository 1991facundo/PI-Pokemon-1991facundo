import Card from "../card/card";
import "./cards.css";

const Cards = ({ pokemons }) => {
  console.log("Displayed Pokemons: ", pokemons);


  const renderCards = () => {
    if (!pokemons || pokemons.length === 0)
      return <p>No hay Pokémon para mostrar</p>;

    return pokemons.map((pokemon, index) => (
      <Card key={index} pokemon={pokemon} />
    ));
  };
  

  return <div className="cards-container">{renderCards()}</div>;
};

export default Cards;
