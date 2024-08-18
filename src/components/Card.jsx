import './Card.css'

const Card = ({pokemon, isFlipped, onClick}) => {
  return(
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
      {isFlipped ? (
        <img src={pokemon?.image} alt={pokemon.name} className="card-image" />
      )
      :
      (
      <div className="card-back">
        <i className="nes-pokeball"></i>
      </div>
      )}
    </div>
  )
}

export default Card
