import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      } catch (error) {
        console.error("Error fetching pokemon:", error);
      }
    };
    fetchPokemon();
  }, [id]);

  return (
    currentPokemon && (
      <div>
        <h1>{currentPokemon.name}</h1>
        <img src={currentPokemon.image} alt={currentPokemon.name} />
        <div>ID: {currentPokemon.id}</div>
        <div>Vida: {currentPokemon.hitPoints}</div>
        <div>Ataque: {currentPokemon.attack}</div>
        <div>Defensa: {currentPokemon.defense}</div>
        <div>Velocidad: {currentPokemon.speed}</div>
        <div>Altura: {currentPokemon.height}</div>
        <div>Peso: {currentPokemon.weight}</div>
        <div>Tipo: {currentPokemon.types.join(", ")}</div>
      </div>
    )
  );
};

export default DetailPage;
