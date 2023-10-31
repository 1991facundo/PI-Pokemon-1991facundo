import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemons,
  applyTypeFilter,
  applyOriginFilter,
  applyOrder,
} from "../../redux/actions";
import NavBar from "../../components/navBar/navBar";
import Cards from "../../components/cards/cards";

const HomePage = () => {
  const dispatch = useDispatch();

  // Usamos selectores separados para cada propiedad del estado
  const pokemons = useSelector((state) => state.pokemons || []);
  const filterType = useSelector((state) => state.filterType);
  const filterOrigin = useSelector((state) => state.filterOrigin);
  const orderCriteria = useSelector((state) => state.orderCriteria);

  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (filterType) {
      dispatch(applyTypeFilter(filterType));
    }
    if (filterOrigin) {
      dispatch(applyOriginFilter(filterOrigin));
    }
    if (orderCriteria) {
      dispatch(applyOrder(orderCriteria));
    }

    // Sólo actualizamos el estado displayedPokemons si pokemons ha cambiado
    if (pokemons !== displayedPokemons) {
      setDisplayedPokemons(pokemons);
    }
  }, [filterType, filterOrigin, orderCriteria, pokemons, dispatch]);

  console.log("Renderizando HomePage");

  return (
    <div>
      <h1>ESTE ES EL HOMEPAGE</h1>
      <NavBar />
      <Cards pokemons={displayedPokemons} />
    </div>
  );
};

export default HomePage;
