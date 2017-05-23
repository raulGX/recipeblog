import React from 'react';
import { Link } from 'react-router-dom'
import recipesApi from '../../api/recipesApi';
import { Button, Modal } from 'react-bootstrap';

class RecipePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false, showModal: false }

    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
  }
  componentDidMount() {
    this.getRecipes()
  }
  closeModal() {
    this.setState({ ...this.state, showModal: false });
  }

  openModal() {
    this.setState({ ...this.state, showModal: true });
  }

  getRecipes() {
    let token = localStorage.getItem('token')
    recipesApi.getMyRecipes("Basic " + token)
      .then(data => this.setState({ ...this.state, loaded: true, recipes: data.data }))
      .catch(error => console.log(error))
  }

  addRecipe() {
    let { description, name } = this;

    let token = localStorage.getItem('token')
    recipesApi.addRecipe("Basic " + token, { name: name.value, description: description.value })
      .then(data => {
        this.closeModal()
        this.getRecipes()
      }).catch(error => alert('eroare inserare'))
  }

  render() {
    let rows = [];
    for (let i in this.state.recipes) {
      let row = this.state.recipes[i]
      rows.push(
        <tr key={'recipe'+row.recipeid}>
          <td><Link to={"/myrecipes/" + row.recipeid}>{row.recipe_name}</Link></td>
          <td>{row.user}</td>
          <td>{row.rating || 'not yet rated'}</td>
        </tr>
      )
    }
    return (
      <div className='container'>
        <h1>My Recipes</h1>
        <Button onClick={this.openModal}>Add Recipe</Button>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
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
            <button className="btn btn-default" type="submit" onClick={this.addRecipe}>Add</button>
            <br />
          </Modal.Body>
        </Modal>
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
