const React = require('react');

class AddGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTitle: '',
      gameCategory: '',
      favorite: false
    }

    this.titleChange = this.titleChange.bind(this);
  }

  titleChange(event) {
    this.setState({gameTitle: event.target.value});
  }

  render() {
    return (
      <div className='add-game'>
        <h3>Add Game:</h3>
        <label htmlFor='game-title'>Game Title:</label>
        <input id='game-title' type='text' onChange={this.titleChange} />
        <label htmlFor='game-category'>Category:</label>
        <select name='category-select' className='game-category'>
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
        <input id='favorite' type='checkbox' value={true} />
        <label htmlFor='favorite'>Favorite</label>
        <input type='Button' defaultValue='Submit' onClick={this.handleSubmit} />
      </div>
    );
  }
}

module.exports = AddGameForm;