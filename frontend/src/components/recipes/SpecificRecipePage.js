import React from 'react';
import recipesApi from '../../api/recipesApi';
import IngredientsTable from '../ingredients/IngredientsTable';

class SpecificRecipePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
    this.getRecipe(this.props.match.params.recipeId)
    console.log(props)
  }
  getRecipe(id) {
    recipesApi.getRecipe(id)
      .then(data => this.setState({ ...this.state, loaded: true, ...data.data }))
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className='container'>
        {
          this.state.loaded ?
            (
              <div>
                <h1>{this.state.recipe_name}</h1>
                <div>
                  <p>{this.state.description}</p>
                  <h3>Ingredients: </h3>
                  <IngredientsTable ingredients={this.state.ingredients} myKey="recipespecific" quantity="true"/>
                </div>
              </div>) : (
              <p>Loading...</p>
            )
        }
      </div>


    );
  }
}

export default SpecificRecipePage;
