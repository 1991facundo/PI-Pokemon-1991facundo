import { Link } from "react-router-dom";
import styles from "../../assets/global.module.css";

const Card = ({ pokemon }) => {
  const renderTypes = () => {
    if (pokemon.types) {
      if (typeof pokemon.types[0] === "string") {
        return pokemon.types.join(" / ");
      } else if (pokemon.types[0].name) {
        return pokemon.types.map((type) => type.name).join(" / ");
      }
    }
    return;
  };

  return (
    <div className={styles.cardContainer}>
      <img src={pokemon.image} alt={pokemon.name} />
      <br />
      <h2>{pokemon.name}</h2>
      <br />
      <div>
        <span>{renderTypes()}</span>
      </div>
      <br />
      <Link to={`/pokemon/${pokemon.id}`}>
        
        <button className={styles.button}>DETAILS </button>
      </Link>
    </div>
  );
};

export default Card;
