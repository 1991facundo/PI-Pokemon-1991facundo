import {useEffect} from 'react'
import { useDispatch } from 'react-redux'

import { fetchPokemons } from "../../redux/actions";
import SearchBar from '../../components/searchBar/searchBar';
import Cards from '../../components/cards/cards'


const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPokemons())
    }), [dispatch]

    console.log('Renderizando HomePage')

    return (
      <div>
        <h1>ESTE ES EL HOMEPAGE</h1>

        <SearchBar />
        <Cards />
      </div>
    );

}

export default HomePage;