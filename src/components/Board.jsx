import Card from "./Card"

import './Board.css'

const Board = ({pokemons, flippedCards, matchedPairs, handleCardClick}) => {
  return(
    <div className="board nes-container is-rounded is-dark">
      {
        pokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            isFlipped={
              flippedCards.includes(pokemon.id) || 
              matchedPairs.includes(pokemon.name)
            }
            onClick={() => handleCardClick(pokemon.id)}
          />
        ))
      }
    </div>
  )
}

export default Board
