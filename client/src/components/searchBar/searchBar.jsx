import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {searchPokemon} from '../../redux/actions'

import styles from "../../assets/global.module.css"

const SearchBar = () => {
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('')

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSearch = () => {
      const errorHandler = inputValue.trim();
    
      if(!errorHandler.length) {
      
        return
      }
        dispatch(searchPokemon(inputValue))
    }


    return (
      <div className="searchbarContainer">
        <input
          type="search"
          placeholder="Search Pokemon by name"
          value={inputValue}
          onChange={handleChange}
        />
        <button className={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>
    );


}

export default SearchBar;