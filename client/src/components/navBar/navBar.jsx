import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  applyTypeFilter,
  applyOriginFilter,
  applyOrder,
} from "../../redux/actions";

import "./navBar.css";

const NavBar = () => {
    const dispatch = useDispatch();

    const [selectedType, setSelectedType] = useState("");
    const [selectedOrigin, setSelectedOrigin] = useState("");
    const [selectedOrder, setSelectedOrder] = useState("");

    const handleTypeChange = (e) => setSelectedType(e.target.value);
    const handleOriginChange = (e) => setSelectedOrigin(e.target.value);
    const handleOrderChange = (e) => setSelectedOrder(e.target.value);

    const applyFilters = () => {
        if (selectedType) dispatch(applyTypeFilter(selectedType));
        if (selectedOrigin) dispatch(applyOriginFilter(selectedOrigin));
        if (selectedOrder) dispatch(applyOrder(selectedOrder));
    };

    return (
        <div className="navbar-container">
            <select onChange={handleTypeChange}>
                <option value="">Selecciona un tipo</option>
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

            <select onChange={handleOriginChange}>
                <option value="">Selecciona el origen</option>
                <option value="api">API</option>
                <option value="db">Base de datos</option>
            </select>

            <select onChange={handleOrderChange}>
                <option value="">Ordenar por</option>
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
                <option value="attack-asc">Ataque (Ascendente)</option>
                <option value="attack-desc">Ataque (Descendente)</option>
            </select>

            <button onClick={applyFilters}>Aplicar</button>
            
        </div>
    );
}

export default NavBar;


