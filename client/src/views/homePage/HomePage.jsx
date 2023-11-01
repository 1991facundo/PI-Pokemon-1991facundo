import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../../redux/actions";
import NavBar from "../../components/navBar/navBar";
import Cards from "../../components/cards/cards";

const HomePage = () => {
  const dispatch = useDispatch();

  const isFiltered = useSelector((state) => state.isFiltered);
  const allPokemons = useSelector((state) => state.pokemons || []);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);

  const pokemonsToShow = isFiltered ? filteredPokemons : allPokemons;

  const sortingCriterion = useSelector((state) => state.sortingCriterion);
  const sortingDirection = useSelector((state) => state.sortingDirection);

  let sortedPokemons = [...pokemonsToShow];

  if (sortingCriterion === "name") {
    sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortingCriterion === "attack") {
    sortedPokemons.sort((a, b) => a.attack - b.attack);
  }

  if (sortingDirection === "desc") {
    sortedPokemons.reverse(); 
  }

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <div>
      <h1>ESTE ES EL HOMEPAGE</h1>
      <NavBar />
      <Cards pokemons={sortedPokemons} />
    </div>
  );
};

export default HomePage;
