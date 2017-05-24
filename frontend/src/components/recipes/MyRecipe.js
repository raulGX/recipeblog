import React from 'react';
import recipesApi from '../../api/recipesApi';
import ingredientsApi from '../../api/ingredientsApi';

import IngredientsTable from '../ingredients/IngredientsTable';
import { Button, Modal, FormControl, ControlLabel } from 'react-bootstrap';


class MyRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false, showModal: false, showModal2: false }

    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal2 = this.closeModal2.bind(this)
    this.openModal2 = this.openModal2.bind(this)
    this.addIngredientToRecipe = this.addIngredientToRecipe.bind(this)
    this.getIngredients = this.getIngredients.bind(this)
    this.getRecipe = this.getRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.deleteIngredient = this.deleteIngredient.bind(this)
    this.updateRecipe = this.updateRecipe.bind(this)
  }
  deleteIngredient(id) {
    let token = 'Basic ' + localStorage.getItem('token')
    recipesApi.deleteIngredientFromRecipe(id, this.props.match.params.recipeId, token)
      .then(() => {
        this.getRecipe(this.props.match.params.recipeId)
      }).catch(error => alert('error deleting'))
  }

  updateRecipe() {
    let token = 'Basic ' + localStorage.getItem('token')
    let updatedRecipe = {
      name: this.name.value,
      description: this.description.value
    }

    recipesApi.updateRecipe(token, this.props.match.params.recipeId, updatedRecipe)
      .then(() => {
        this.closeModal2()
        this.getRecipe(this.props.match.params.recipeId)
      }).catch((error) => alert('error inserting'))
  }
  deleteRecipe() {
    let token = 'Basic ' + localStorage.getItem('token')
    recipesApi.deleteRecipe(token, this.props.match.params.recipeId)
      .then(() => {
        this.props.history.push('/myrecipes')
      }).catch(error => alert('error inserting'))
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

  closeModal2() {
    this.setState({ ...this.state, showModal2: false });
  }

  openModal2() {
    this.setState({ ...this.state, showModal2: true });
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
                </h1>
                <div>
                  <p>{this.state.description}</p>
                  <Button onClick={this.openModal}>Add Ingredient</Button>
                  <Button className="btn-danger pull-right" onClick={this.deleteRecipe}>Delete</Button>
                  <Button className="btn-success pull-right" onClick={this.openModal2}>Edit</Button>

                  <Modal show={this.state.showModal2} onHide={this.closeModal2}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add a recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="input-group">
                        <label>Name</label>
                        <input ref={input => this.name = input} type="text" className="form-control" placeholder="Name" />
                      </div>
                      <div className="input-group">
                        <label>Description</label>
                        <textarea ref={input => this.description = input} type="text" className="form-control" placeholder="Description" />
                      </div>
                      <button className="btn btn-default" type="submit" onClick={this.updateRecipe}>Update</button>
                      <br />
                    </Modal.Body>
                  </Modal>

                  <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add an ingredient</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ControlLabel>Select ingredient</ControlLabel>
                      <FormControl inputRef={input => this.ingredient = input} componentClass="select">
                        {ingredientsRows}
                      </FormControl>
                      <br />
                      <div className="input-group">
                        <label>Quantity</label>
                        <input ref={input => this.quantity = input} type="text" className="form-control" placeholder="Quantity" />
                      </div>
                      <br />
                      <button className="btn btn-default" type="submit" onClick={this.addIngredientToRecipe}>Add</button>
                      <br />
                    </Modal.Body>
                  </Modal>
                  <h3>Ingredients: </h3>
                  <IngredientsTable ingredients={this.state.ingredients} deleteIngredient={this.deleteIngredient} myKey="myrecipe" quantity="true" />
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
