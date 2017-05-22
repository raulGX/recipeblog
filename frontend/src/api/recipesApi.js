import * as constants from './constants';
import axios from 'axios';

class RecipesApi {
  static getAllRecipes() {
    return axios.get(constants.api + 'recipes')
      .catch(error => error)
  }
  static getRecipe(id) {
    return axios.get(constants.api + 'recipes/' + id)
      .catch(error => error)
  }
}

export default RecipesApi;
