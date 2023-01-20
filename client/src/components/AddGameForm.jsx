const React = require('react');

class AddGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTitle: '',
      gameCategoryId: 1,
      favorite: false
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTitleChange(event) {
    this.setState({gameTitle: event.target.value});
  }

  handleCategoryChange(event) {
    this.setState({gameCategoryId: Number(event.target.value)});
  }

  toggleFavorite(event) {
    this.setState({favorite: event.target.checked});
  }

  handleSubmit() {
    if (this.state.gameTitle.length <= 0) {
      alert('Please enter game title');
    } else {
      this.props.addGame({gameTitle: this.state.gameTitle, gameCategoryId: this.state.gameCategoryId, favorite: this.state.favorite});
      this.resetInputs();
    }
  }

  resetInputs() {
    this.setState({
      gameTitle: '',
      gameCategoryId: 1,
      favorite: false
    });
  }

  render() {
    return (
      <div className='add-game'>
        <h3>Add Game:</h3>
        <label htmlFor='game-title'>Game Title:</label>
        <input id='game-title' type='text' onChange={this.handleTitleChange} value={this.state.gameTitle}/>
        <label htmlFor='game-category'>Category:</label>
        <select name='category-select' className='game-category' onChange={this.handleCategoryChange} value={this.state.gameCategoryId}>
          {this.props.categories.map((category, i) => {
            if (category.id === 1) {
              return (
                <option key={category.id} value={category.id} defaultValue>{category.category_name}</option>
              );
            } else {
              return (
                <option key={category.id} value={category.id}>{category.category_name}</option>
              );
            }
          })}
        </select>
        <input id='favorite' type='checkbox' value={true} onChange={this.toggleFavorite} checked={this.state.favorite}/>
        <label htmlFor='favorite'>Favorite</label>
        <input type='Button' defaultValue='Submit' onClick={this.handleSubmit} />
      </div>
    );
  }
}

module.exports = AddGameForm;