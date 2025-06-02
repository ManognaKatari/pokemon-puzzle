import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import initialPokemons from './data'
import Board from './components/Board'
import Confetti from 'react-confetti'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    const shuffledPokemons = [...initialPokemons, ...initialPokemons].sort(() => Math.random()-0.5).map((pokemon) => ({...pokemon, id: Math.random()}))
    
    setPokemons(shuffledPokemons)
  }, [])

  const resetGame = () => {
    setFlippedCards([])
    setGameWon(false)
    setMoves(0)
    setMatchedPairs([])

    const shuffledPokemons = [...initialPokemons, ...initialPokemons].sort(() => Math.random()-0.5).map((pokemon) => ({...pokemon, id: Math.random()}))
    
    setPokemons(shuffledPokemons)
  }

  const handleCardClick = (id) => {
    if(flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards([...flippedCards, id])
    }
  }

  useEffect(() => {
    if(flippedCards.length===2) {
      const [firstCard, secondCard] = flippedCards.map((id) => pokemons.find((pokemon) => pokemon.id == id))

      if(firstCard.name === secondCard.name) {
        setMatchedPairs([...matchedPairs, firstCard.name])
      }

      setTimeout(() => {
        setFlippedCards([])
        setMoves(moves+1)
      }, 1000)
    }
  }, [flippedCards])

  useEffect(() => {
    if(matchedPairs.length === initialPokemons.length) {
      setGameWon(true)
    }
  }, [matchedPairs])

  const progressValue = (matchedPairs.length / initialPokemons.length)*100

  return (
    <>
      <div>
        <i className='nes-ash'></i>
        <h1 className='nes-text title'>Pokemon Puzzle Game</h1>
        <h3 className='nes-text'>Moves: {moves}</h3>
        <progress className='nes-progress is-pattern' 
          value={progressValue}
          max="100"
        ></progress>
        {gameWon && <Confetti />}
        <Board
          pokemons={pokemons}
          flippedCards={flippedCards}
          matchedPairs={matchedPairs}
          handleCardClick={handleCardClick}
          />

        <button className='nes-btn is-error' onClick={resetGame}>
          Restart Game
        </button>
      </div>
    </>
  )
}

export default App
