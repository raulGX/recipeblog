import * as constants from './constants';
import axios from 'axios';

class LoginApi {
  static login(email, password) {
    return axios.post(constants.api + 'login',{
      email, password
    })
      .catch(error => error)
  }
  static register(email, password) {
    return axios.post(constants.api + 'register',{
      email, password
    })
      .catch(error => error)
  }
}

export default LoginApi;
