const React = require('react');
const axios = require('axios')


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: '',
      favorited: ''
    }

    this.gameInfo = this.gameInfo.bind(this);
  }

  componentDidMount() {
    this.gameInfo(this.props.game);
  }

  gameInfo(game) {
    let gameIsFavorite;
    if (game.favorite === false) {
      gameIsFavorite = 'No';
    } else {
      gameIsFavorite = 'Yes';
    }

    axios.get('/categories', {params: {id: game.category_id}})
    .then((res) => {
      this.setState({title: game.title, category: res.data[0].category_name, favorited: gameIsFavorite});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className='games-row'>
        <div className='games-data'>{this.state.title}</div>
        <div className='games-data'>{this.state.category}</div>
        <div className='games-data'>{this.state.favorited}</div>
      </div>
    )
  }
}

module.exports = Game;