import React from 'react';
import { Link } from 'react-router-dom'
import recipesApi from '../../api/recipesApi';

class RecipePage extends React.Component {
   constructor(props) {
    super(props)
    this.state = { loaded: false }
    this.getRecipes()
  }
  getRecipes() {
    recipesApi.getAllRecipes()
      .then(data => this.setState({ ...this.state, loaded: true, recipes: data.data }))
      .catch(error => console.log(error))
  }
  render() {
    let rows = [];
    for (let i in this.state.recipes) {
      let row = this.state.recipes[i]
      rows.push(
        <tr key={row.recipeid}>
          <td><Link to={"/recipes/" + row.recipeid}>{row.recipe_name}</Link></td>
          <td>{row.user}</td>
          <td>{row.rating || 'not yet rated'}</td>
        </tr>
      )
    }
    return (
      <div className='container'>
        <h1>Recipes page</h1>
        <div>
          {this.state.loaded ?
            (
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Made by</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </table>) :
            (
              <p> Loading...</p>
            )
          }
        </div>
      </div>
    );
  }
}

export default RecipePage;
