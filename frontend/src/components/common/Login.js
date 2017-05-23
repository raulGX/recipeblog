import React from 'react';
import { Link } from 'react-router-dom';
import loginApi from '../../api/loginApi';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }
  login() {
    let { email, password } = this;
    loginApi.login(email.value, password.value)
      .then(response => {
        let token = response.data.token
        let isAdmin = response.data.isAdmin

        window.localStorage.setItem("token", token)
        window.localStorage.setItem("isAdmin", "" + isAdmin)

        window.location.reload()
        this.props.history.push('/')
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            <div className="input-group">
              <label>Username</label>
              <input ref={input => this.email = input } type="text" className="form-control" placeholder="Username" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input ref={input => this.password = input } type="password" className="form-control" placeholder="Password" />
            </div>
            <button className="btn btn-default" type="submit" onClick={this.login}>Login</button>
            <br />
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    );
  }

};

export default Login;
