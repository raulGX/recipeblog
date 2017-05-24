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
    }).catch(error => error)
  }

  static addIngredientToRecipe(token, ingredient) {
    return axios.post(constants.api + 'ingredients/' + ingredient.recipeid, ingredient, {
      headers: {
        "authorization": token
      }
    }).catch(error => error)
  }

  static deleteRecipe(token, recipeId) {
    return axios.delete(constants.api + 'myRecipes/' + recipeId, {
      headers: {
        "authorization": token
      }
    }).catch(error => error)
  }

  static updateRecipe(token, recipeId, recipe) {
    return axios.put(constants.api + 'myRecipes/' + recipeId, recipe, {
      headers: {
        "authorization": token
      }
    }).catch(error => error)
  }

  static deleteIngredientFromRecipe(ingredient, recipe, token) {
    return axios.delete(constants.api + `myRecipes/ingredients/${ingredient},${recipe}`, {
      headers: {
        "authorization": token
      }
    }).catch(error => error)
  }
}

export default RecipesApi;
