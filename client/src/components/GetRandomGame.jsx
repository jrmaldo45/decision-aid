const React = require('react');
const axios = require('axios');


class GetRandomGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'none',
      favoritesOnly: false
    };

    this.validGames = this.validGames.bind(this);
    this.handleFavoriteChange = this.handleFavoriteChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleFavoriteChange() {
    this.setState({ favoritesOnly: !this.state.favoritesOnly });
  }

  handleCategoryChange(event) {
    this.setState({ selectedCategory: event.target.value });
  }

  validGames() {
    let categoryFilter;

    if (this.state.selectedCategory === 'none') {
      axios.get('/games', { params: { favoritesOnly: this.state.favoritesOnly } })
        .then((res) => {
          this.props.getGames(res.data);
        })
        .catch((err => console.log(err)));
    } else {
      axios.get('/categories/find', { params: { category: this.state.selectedCategory } })
        .then((res) => {
          categoryFilter = res.data.id;
        })
        .then(() => {
          axios.get('/games', { params: { category_id: categoryFilter, favoritesOnly: this.state.favoritesOnly } })
            .then((res) => {
              this.props.getGames(res.data);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log('Error getting Valid Games: ', err));
    }
  }

  render() {
    return (
      <div className='get-random-div'>
        <label htmlFor='game-category'>Filter by Category:</label>
        <select name='category-select' className='game-category' onChange={this.handleCategoryChange}>
          {this.props.categories.map((category, i) => {
            if (category.id === 1) {
              return (
                <option key={category.id} defaultValue>{category.category_name}</option>
              );
            } else {
              return (
                <option key={category.id}>{category.category_name}</option>
              );
            }
          })}
        </select>
        <label htmlFor='favorite'>Filter by Favorite</label>
        <input id='favorite' type='checkbox' value='true' onChange={this.handleFavoriteChange} />
        <input id='random-button' type='button' value='Pick a Game' onClick={this.validGames} />
      </div>
    );
  }
}

module.exports = GetRandomGame;