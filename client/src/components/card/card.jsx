import { Link } from "react-router-dom";
import "./card.css";

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
    <div className="card-container">
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <div>
        <span>{renderTypes()}</span>
      </div>
      <Link to={`/pokemon/${pokemon.id}`}>Ver Detalles</Link>
    </div>
  );
};

export default Card;
