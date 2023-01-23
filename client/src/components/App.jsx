const React = require('react');
const axios = require('axios');
const GamesList = require('./GamesList.jsx');
const CategoriesList = require('./CategoriesList.jsx');
const AddGameForm = require('./AddGameForm.jsx');
const GetRandomGame = require('./GetRandomGame.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      categories: [],
      chosenGame: ''
    };

    this.getAllGames = this.getAllGames.bind(this);
    this.getAllCategories = this.getAllCategories.bind(this);
    this.getGames = this.getGames.bind(this);
    this.addGame = this.addGame.bind(this);
  }

  componentDidMount() {
    this.getAllGames();
    this.getAllCategories();
  }

  getAllGames() {
    axios.get('/games')
      .then((res) => {
        this.setState({games: res.data});
      })
      .catch(err => console.log(err));
  }

  getAllCategories() {
    axios.get('/categories')
      .then((res) => {
        this.setState({categories: res.data});
      })
      .catch(err => console.log(err));
  }

  getGames(validGames) {
    const min = Math.ceil(0);
    const max = Math.floor(validGames.length);
    let randomIndex = Math.floor(Math.random() * (max - min) + min);

    this.setState({chosenGame: validGames[randomIndex].title});
  }

  addGame(gameObj) {
    axios.post('/games', gameObj);
  }

  render() {
    return (
      <div className='app'>
        <h1>Game Decision Aid</h1>
        <div className='main-content'>
          <AddGameForm categories={this.state.categories} addGame={this.addGame}/>
          <GamesList games={this.state.games} />
          <CategoriesList categories={this.state.categories} />
        </div>
        <GetRandomGame games={this.state.games} categories={this.state.categories} getGames={this.getGames}/>
        <div className='selected-game'>
          <h3>You should play: </h3>
          <h2 className='selected-game'>{this.state.chosenGame}</h2>
        </div>
      </div>
    )
  }
}

module.exports = App;