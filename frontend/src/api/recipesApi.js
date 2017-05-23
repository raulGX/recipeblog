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
  static getMyRecipes(token) {
    return axios.get(constants.api + 'myrecipes', {
      headers: {
        "authorization": token
      }
    })
      .catch(error => error)
  }
  static addRecipe(token, recipe) {
    return axios.post(constants.api + 'recipes', recipe, {
      headers: {
        "authorization": token
      }
    })
  }
}

export default RecipesApi;
