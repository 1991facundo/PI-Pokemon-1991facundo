import SearchBar from "../searchBar/searchBar";

import { useDispatch } from "react-redux";
import {
  filterByType,
  filterByOrigin,
  resetFilteredPokemons,
} from "../../redux/actions";

import { useSelector } from "react-redux";

import "./navBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleTypeFilter = (event) => {
    const type = event.target.value;

    if (type === "") {
      dispatch(resetFilteredPokemons());
    } else {
      console.log("Filtrando por tipo:", type);
      dispatch(filterByType(type));
    }
  };

  const handleOriginFilter = (event) => {
    const origin = event.target.value;

    if (origin === "") {
      console.log("filtrado por todos");
      dispatch(resetFilteredPokemons());
    } else {
      console.log("Filtrando por:", origin);
      dispatch(filterByOrigin(origin));
    }
  };

  return (
    <div className="navbar-container">
      <SearchBar />

      <select onChange={handleTypeFilter}>
        <option value="">Select Type</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="grass">Grass</option>
        <option value="normal">Normal</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="rock">Rock</option>
        <option value="bug">Bug</option>
        <option value="ghost">Ghost</option>
        <option value="steel">Steel</option>
        <option value="electric">Electric</option>
        <option value="psychic">Psychic</option>
        <option value="ice">Ice</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="fairy">Fairy</option>
        <option value="unknown">Unknown</option>
        <option value="flying">Flying</option>
        <option value="shadow">Shadow</option>
      </select>

      <select onChange={handleOriginFilter}>
        <option value="">Select Origin</option>
        <option value="API">API</option>
        <option value="DB">Database</option>
      </select>
    </div>
  );
};

export default NavBar;
