import Card from "../card/card";
import styles from "../../assets/global.module.css";

const Cards = ({ pokemons }) => {

  const renderCards = () => {
    if (!pokemons || pokemons.length === 0)
      return <p>No hay Pokémon para mostrar</p>;

    return pokemons.map((pokemon, index) => (
      <Card key={index} pokemon={pokemon} />
    ));
  };
  

  return <div className={styles.cardsContainer}>{renderCards()}</div>;
};

export default Cards;
