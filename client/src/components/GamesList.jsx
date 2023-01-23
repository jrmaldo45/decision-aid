const React = require('react');
const Game = require('./Game.jsx');

const GamesList = (props) => {
  return (
    <div className='games-list'>
      <h3>Your Games</h3>
      <table className='games-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {props.games.map((game, i) => {
            return (<Game game={game} key={i}/>)
          })}
        </tbody>
      </table>
    </div>
  )
}

module.exports = GamesList;