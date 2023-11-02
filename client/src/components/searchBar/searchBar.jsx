import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {searchPokemon} from '../../redux/actions'

import "./searchBar.css";

const SearchBar = () => {
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('')

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSearch = () => {
      const errorHandler = inputValue.trim();
      // console.log(errorHandler)
      if(!errorHandler.length) {
        // console.log("hola")
        return
      }
        dispatch(searchPokemon(inputValue))
    }


    return (
      <div className="searchbar-container">
        <input
          type="search"
          placeholder="Search Pokemon by name"
          value={inputValue}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>
    );


}

export default SearchBar;