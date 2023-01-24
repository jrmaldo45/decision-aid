const React = require('react');


const CategoriesList = (props) => {
  return (
    <div className='categories'>
      <h3>Categories</h3>
      <table className='categories-table'>
        <tbody>
          {props.categories.map((category, i) => {
            return (
              <tr key={i}>
                <td key={i}>{category.category_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

module.exports = CategoriesList;