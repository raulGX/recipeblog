import React from 'react';
import categoriesApi from '../../api/ingredientCatsApi'

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }

  }
  componentDidMount() {
    categoriesApi.getAllCategories()
      .then(data => this.setState({ ...this.state, loaded: true, categories: data.data }))
      .catch(error => console.log(error))
  }
  render() {
    let rows = [];
    for (let i in this.state.categories) {
      let row = this.state.categories[i]
      rows.push(
        <tr key={row.catid}>
          <td>{row.catname}</td>
        </tr>
      )
    }

    return (
      <div className="container">
        <h1>Categories page</h1>
        {this.state.loaded ?
          (
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Name</th>
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
    );
  }
}

export default CategoriesPage;
