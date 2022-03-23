const React = require('react');
const Game = require('./Game.jsx');

const GamesList = (props) => {
  return (
    <div className='games'>
      <h3>Your Games</h3>
      <div className='games-table'>
        <div className='games-header games-row'>
          <div className='games-data'>Name</div>
          <div className='games-data'>Category</div>
          <div className='games-data'>Favorite</div>
        </div>
        {props.games.map((game, i) => {
          return (<Game game={game} key={i}/>)
        })}
      </div>
    </div>
  )
}

module.exports = GamesList;