import './App.css';
import PokemonDetails from './components/side-bar/PokemonDetails';
import { useEffect, useState } from 'react';
import PokeCard from './components/poke-card/PokeCard';
import Loading from './components/loading/Loading';

function App() {

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [loadPoke,setLoadPoke] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [nextPoke, setNextPoke] = useState('');

  const [isLoading, setIsloading] = useState(false);

  const [pokemons, setPokemons] = useState([]);

 const getPokeData = async () => {
    setIsloading(true);
    const res = await fetch(loadPoke)
    const data = await res.json();
    setNextPoke(data.next);
    
    const array = Array.from({length: data.results}, (index) => index);

    async function createPokemonObject(result){

      const max = result.length;
      for (let i = 0; i < max; i++) {
        const pokemon = result[i];
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json();
        array[i] = data;
        
      }
    }
    if(pokemons.length === 0) {
      setSelectedPokemon(0);
    }
    await createPokemonObject(data.results)
    setPokemons([...pokemons, ...array]);

    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  }


  useEffect(() => {
    getPokeData();
  }, [loadPoke])

  return (
    <div className="App">
      {isLoading && <Loading />}
      <ul className='poke-grid'>
        {
          pokemons.map((pokemon, index) => (
            <PokeCard key={pokemon.id} data={pokemon} 
              onClick={() => {
                if(selectedPokemon === index) setOpenDetails(false);
                else {
                  setSelectedPokemon(index);
                  setOpenDetails(true);
                }
              }}
            />
          ))
        }
          <li className='poke-card'>
            <div className='white-cover' onClick={() => setLoadPoke(nextPoke)}>
              Next 20
            </div>
          </li>
      </ul>
      <PokemonDetails open={openDetails} data={pokemons[selectedPokemon]}/>
    </div>
  );
}

export default App;
