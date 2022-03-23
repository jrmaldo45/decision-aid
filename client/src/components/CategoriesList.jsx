const React = require('react');


const CategoriesList = (props) => {
  return (
    <div className='category'>
      <h3>Categories</h3>
      {props.categories.map((category, i) => {
        return (
          <div className='category-data' key={i}>{category.category_name}</div>
        );
      })}
    </div>
  )
}

module.exports = CategoriesList;