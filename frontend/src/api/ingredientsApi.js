import * as constants from './constants';
import axios from 'axios';

class IngredientsApi {
  static getAllIngredients() {
    return axios.get(constants.api + 'ingredients')
      .catch(error => error)
  }

}

export default IngredientsApi;
