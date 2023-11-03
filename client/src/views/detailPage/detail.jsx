import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./detail.css";

const DetailPage = () => {
  const { id } = useParams();
  const [currentPokemon, setCurrentPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`http://localhost:3001/pokemons/${id}`);
        if (!response.ok) {
          console.error("Failed to fetch pokemon:", response.statusText);
          return;
        }
        const data = await response.json();
        setCurrentPokemon(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      }
    };
    fetchPokemon();
  }, [id]);


  return (
    currentPokemon && (
      <div className="detail-card">
        <Link to="/home">
          <button>
            X
          </button>
        </Link>
        <h1>{currentPokemon.name}</h1>
        <img src={currentPokemon.image} alt={currentPokemon.name} />
        <div>Life: {currentPokemon.life}</div>
        <div>Attack: {currentPokemon.attack}</div>
        <div>Defense: {currentPokemon.defense}</div>
        <div>Speed: {currentPokemon.speed}</div>
        <div>Height: {currentPokemon.height}</div>
        <div>Weight: {currentPokemon.weight}</div>
        <div>Type: {currentPokemon.types.join(" / ")}</div>
      </div>
    )
  );
};

export default DetailPage;
