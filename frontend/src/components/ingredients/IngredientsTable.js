import React from 'react'
import { Button } from 'react-bootstrap';
const IngredientsTable = ({ ingredients, myKey, quantity, deleteIngredient }) => {
  let rows = [];
  for (let i in ingredients) {
    let row = ingredients[i]
    rows.push(
      <tr key={myKey+row.ingredientid}>
        <td>{row.ingredient_name}</td>
        <td>{row.measure_unit}</td>
        <td>{row.calories || 'not defined'}</td>
        <td>{row.catname}</td>
        {quantity && <td>{row.quantity}</td>}
        {deleteIngredient && <Button className="btn-danger pull-right" onClick={() => deleteIngredient(row.ingredientid)} bsSize="xsmall" >Delete</Button>}

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
          {quantity && <th>Quantity</th>}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};


export default IngredientsTable;
