import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ pokemon }) => {
  return (
    <div className="card-container">
      <img src={pokemon.image} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <div>
        {pokemon.types ? (
          <span>{pokemon.types.join(" / ")}</span>
        ) : (
          <span>No Types Available</span>
        )}
      </div>
      <Link to={`/pokemon/${pokemon.id}`}>Ver Detalles</Link>
    </div>
  );
};

export default Card;
