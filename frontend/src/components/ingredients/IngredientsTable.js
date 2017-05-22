import React from 'react'

const IngredientsTable = ({ ingredients }) => {
  let rows = [];
  for (let i in ingredients) {
    let row = ingredients[i]
    rows.push(
      <tr key={row.ingredientid}>
        <td>{row.ingredient_name}</td>
        <td>{row.measure_unit}</td>
        <td>{row.calories || 'not defined'}</td>
        <td>{row.catname}</td>
      </tr>
    )
  }
  return (
    <table className="table table-condensed">
      <thead>
        <tr>
          <th>Name</th>
          <th>Measure Unit</th>
          <th>Calories</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};


export default IngredientsTable;
