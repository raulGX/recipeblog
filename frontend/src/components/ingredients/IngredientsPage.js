import React from 'react';

import IngredientsTable from './IngredientsTable';
import ingredientsApi from '../../api/ingredientsApi';

class IngredientsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }
  componentDidMount() {
    this.getIngredients()
  }
  getIngredients() {
    ingredientsApi.getAllIngredients()
      .then(data => this.setState({ ...this.state, loaded: true, ingredients: data.data }))
      .catch(error => console.log(error))
  }
  render() {

    return (
      <div className='container'>
        <h1>Ingredients page</h1>
        <div>
          {this.state.loaded ?
            (
              <IngredientsTable ingredients={this.state.ingredients} myKey="ingredientspage"/>
            ) : (
              <p> Loading...</p>
            )
          }
        </div>
      </div>
    );
  }
}

export default IngredientsPage;
