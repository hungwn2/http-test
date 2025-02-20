import React, { useState, useEffect } from 'react';

export default function App() {
  const getNRandomPokemon = async (n) => {
    const pokemonArray = [];
    const randomIds = new Set();
    
    while (randomIds.size < n) {
      randomIds.add(Math.floor(Math.random() * 100) + 1);
      //generate random keys
    }

    for (let id of randomIds) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const pokemon = {
          id: id.toString(),
          name: data.name,
          image: data.sprites.front_default,
          clicked: false
        };
        pokemonArray.push(pokemon);
      } catch (error) {
        console.error(`Error fetching Pokemon ${id}:`, error);
      }
    }
    
    return pokemonArray;
  };

  const [roundScore, setRoundScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);

  //re-render all the time
  
  useEffect(() => {
    async function loadPokemon() {
      const initialPokemon = await getNRandomPokemon(2);
      setPokemons(initialPokemon);
    }
    loadPokemon();
  }, []);

  const shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    const newArray = [...array];

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]
      ];
    }

    return newArray;
  };

  const onClick=async(id)=>{
    const pokemonItems=[...pokemons];
    //array to manipulate current pokemons
    const clickedPokemon=pokemonItems.find(poke=>poke.id===id);
    if (clickedPokemon.clicked){
      if (currentScore>bestScore){
        setBestScore(currentScore);
  
      }
      setCurrentScore(0);
      setRoundScore(0);
      const newPokemon=await getNRandomPokemon(2);
      setPokemons(getNRandomPokemon(2));
    }
    else{
      if (roundScore===pokemons.length-1){
        setRoundScore(0);
        const newPokemon=await getNRandomPokemon(pokemons.length+1);
        setPokemons(newPokemon);
      }
      else{
          setRoundScore(roundScore+1);
          clickedPokemon.clicked=true;
          setPokemons(shuffle(pokemonItems));
        }
        setCurrentScore(currentScore+1);
      }
    }
  

  // const onClick = async (id) => {
  //   const pokemonItems = [...pokemons];
  //   const clickedPokemon = pokemonItems.find(poke => poke.id === id);
    
  //   if (clickedPokemon.clicked) {
  //     if (currentScore > bestScore) {
  //       setBestScore(currentScore);
  //     }
  //     setCurrentScore(0);
  //     setRoundScore(0);
  //     const newPokemon = await getNRandomPokemon(2);
  //     setPokemons(newPokemon);
  //   } else {
  //     if (roundScore === pokemons.length - 1) {
  //       //add one card for every point scored
  //       setRoundScore(0);
  //       const newPokemon = await getNRandomPokemon(pokemons.length + 1);
  //       setPokemons(newPokemon);
  //     } else {
  //       setRoundScore(roundScore + 1);
  //       clickedPokemon.clicked = true;
  //       setPokemons(shuffle(pokemonItems));
  //     }
  //     setCurrentScore(currentScore + 1);
  //   }
  

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Pokemon Memory Game</h1>
        <div className="flex gap-8">
          <h2 className="text-xl">Current Score: {currentScore}</h2>
          <h2 className="text-xl">Best Score: {bestScore}</h2>
        </div>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((poke) => (
          <button
            key={poke.id}
            onClick={() => onClick(poke.id)}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <img 
              src={poke.image} 
              alt={poke.name}
              className="w-32 h-32 mx-auto"
            />
            <p className="text-center capitalize mt-2">{poke.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}