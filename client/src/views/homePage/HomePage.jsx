import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, setPage } from "../../redux/actions";
import NavBar from "../../components/navBar/navBar";
import Cards from "../../components/cards/cards";
import Pagination from "../../components/pagination/pagination";

const HomePage = () => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.currentPage);
  const elementsPerPage = 12;

  const isFiltered = useSelector((state) => state.isFiltered);
  const allPokemons = useSelector((state) => state.pokemons || []);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);

  const sortingCriteria = useSelector((state) => state.sortingCriteria);
  const sortingDirection = useSelector((state) => state.sortingDirection);

  const pokemonsToShow = isFiltered ? filteredPokemons : allPokemons;

  const sortedPokemons = [...pokemonsToShow];

  // console.log("Initial pokemons list:", sortedPokemons);




  if (sortingCriteria && sortingDirection) {
    if (sortingCriteria === "name") {
     
      sortedPokemons.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortingCriteria === "attack") {
    
      sortedPokemons.sort((a, b) => a.attack - b.attack);
    }

    if (sortingDirection === "desc") {
      sortedPokemons.reverse();
    }
  }

  const totalPages = Math.ceil(sortedPokemons.length / elementsPerPage);

  const lastPokemonIndex = currentPage * elementsPerPage;
  const firstPokemonIndex = lastPokemonIndex - elementsPerPage;
  const currentPokemons = sortedPokemons.slice(
    firstPokemonIndex,
    lastPokemonIndex
  );
  // console.log("Pokemon to show:", currentPokemons);

  const handlePageChange = (pageNumber) => {
   
    dispatch(setPage(pageNumber));
  };

  useEffect(() => {
    if (allPokemons.length === 0) {
      dispatch(fetchPokemons());
    }
  }, [dispatch, allPokemons]);

  return (
    <div>
      <h1>ESTE ES EL HOMEPAGE</h1>
      <NavBar />
      <Cards pokemons={currentPokemons} />
      <Pagination
        page={handlePageChange}
        total={totalPages}
        current={currentPage}
      />
    </div>
  );
};

export default HomePage;
