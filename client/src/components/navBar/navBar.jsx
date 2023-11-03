import SearchBar from "../searchBar/searchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  filterByType,
  filterByOrigin,
  resetFilteredPokemons,
  setSortingCriteria,
  setSortingDirection,
  fetchPokemons,
  fetchTypes,
} from "../../redux/actions";

import "./navBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [localCriteria, setLocalCriteria] = useState(null);
  const [localDirection, setLocalDirection] = useState(null);

  const handleTypeFilter = (event) => {
    const type = event.target.value;

    if (type === "") {
      dispatch(resetFilteredPokemons());
    } else {
      // console.log("FIlter by type:", type);
      dispatch(filterByType(type));
    }
  };

  const handleOriginFilter = (event) => {
    const origin = event.target.value;

    if (origin === "") {
      // console.log("filter by all");
      dispatch(resetFilteredPokemons());
    } else {
      // console.log("filter by:", origin);
      dispatch(filterByOrigin(origin));
    }
  };

  const handleSortingCriteria = (event) => {
    const criteria = event.target.value;
    setLocalCriteria(criteria);

    if (localDirection) {
      dispatch(setSortingCriteria(criteria));
      dispatch(setSortingDirection(localDirection));
    }
  };

  const handleSortingDirection = (event) => {
    const direction = event.target.value;
    setLocalDirection(direction);

    if (localCriteria) {
      dispatch(setSortingCriteria(localCriteria));
      dispatch(setSortingDirection(direction));
    }
  };

  const handleShowAllClick = () => {
    dispatch(resetFilteredPokemons());
    dispatch(fetchPokemons());
  };

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  return (
    <div className="navbar-container">
      <SearchBar />

      <button onClick={handleShowAllClick}>Show All</button>

      {/* -----------FILTERS------------ */}

      <select onChange={handleTypeFilter}>
        <option value="">Type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select onChange={handleOriginFilter}>
        <option value="">Origin</option>
        <option value="API">API</option>
        <option value="DB">Database</option>
      </select>

      {/* -----------ORDER------------ */}

      <div className="sorting-container">
        <select onChange={handleSortingCriteria}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="attack">Attack</option>
        </select>

        <select onChange={handleSortingDirection}>
          <option value="">Direction</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <Link to={`/create`}>
        {" "}
        <button>Create Pokemon</button>{" "}
      </Link>
    </div>
  );
};

export default NavBar;
