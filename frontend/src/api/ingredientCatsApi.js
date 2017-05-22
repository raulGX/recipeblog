import * as constants from './constants';
import axios from 'axios';

class IngredientCategoriesApi {
  static getAllCategories() {
    return axios.get(constants.api + 'ingredientCategories')
      .catch(error => error)
  }

}

export default IngredientCategoriesApi;
