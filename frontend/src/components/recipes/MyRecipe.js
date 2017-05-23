import React from 'react';
import recipesApi from '../../api/recipesApi';
import ingredientsApi from '../../api/ingredientsApi';

import IngredientsTable from '../ingredients/IngredientsTable';
import { Button, Modal, FormControl, ControlLabel } from 'react-bootstrap';


class MyRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false, showModal: false }

    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.addIngredientToRecipe = this.addIngredientToRecipe.bind(this)
    this.getIngredients = this.getIngredients.bind(this)
    this.getRecipe = this.getRecipe.bind(this)
  }

  componentDidMount() {
    this.getIngredients()
    this.getRecipe(this.props.match.params.recipeId)
  }
  getIngredients() {
    ingredientsApi.getAllIngredients()
      .then(data => this.setState(state => {
        return { ...state, addIngredients: data.data }
      }))
      .catch(error => {
        console.log(error)
        this.getIngredients()
      })
  }

  getRecipe(id) {
    recipesApi.getRecipe(id)
      .then(data => this.setState((state => {
        return { ...state.state, loaded: true, ...data.data }
      })))
      .catch(error => console.log(error))
  }

  addIngredientToRecipe() {
    let token = 'Basic ' + localStorage.getItem('token')
    let ingredient = {
      "ingredientid": this.ingredient.value,
      "recipeid": this.props.match.params.recipeId,
      "quantity": this.quantity.value
    }
    recipesApi.addIngredientToRecipe(token, ingredient)
      .then(() => {
        this.closeModal();
        this.getRecipe(this.props.match.params.recipeId);
      }).catch(() => alert('error inserting in db'))
  }
  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  openModal() {
    this.setState({ ...this.state, showModal: true });
  }

  render() {
    let ingredientsRows = [];
    let ingredients = this.state.addIngredients;
    for (let i in ingredients) {
      let row = ingredients[i];
      ingredientsRows.push(
        <option key={row.ingredientid + 'ingredientrow'} value={row.ingredientid}>{row.ingredient_name}, in {row.measure_unit}</option>
      )
    }
    return (
      <div className='container'>
        {
          this.state.loaded ?
            (
              <div>
                <h1>{this.state.recipe_name}
                  <span className="pull-right">{this.state.rating === null ? "" : "Rating: " + this.state.rating}</span>
                </h1>
                <div>
                  <p>{this.state.description}</p>
                  <Button onClick={this.openModal}>Add Ingredient</Button>
                  <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add an ingredient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="input-group">
                        <label>Quantity</label>
                        <input ref={input => this.quantity = input} type="text" className="form-control" placeholder="Quantity" />
                      </div>
                      <ControlLabel>Select</ControlLabel>
                      <FormControl inputRef={input => this.ingredient = input} componentClass="select">
                        {ingredientsRows}
                      </FormControl>
                      <button className="btn btn-default" type="submit" onClick={this.addIngredientToRecipe}>Add</button>
                      <br />
                    </Modal.Body>
                  </Modal>
                  <h3>Ingredients: </h3>
                  <IngredientsTable ingredients={this.state.ingredients} myKey="myrecipe" />
                </div>
              </div>) : (
              <p>Loading...</p>
            )
        }
      </div>


    );
  }
}

export default MyRecipe;
