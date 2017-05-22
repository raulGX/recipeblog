import React from 'react';
import { Link } from 'react-router-dom';
class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            <div className="input-group">
              <label>Username</label>
              <input type="text" className="form-control" placeholder="Username" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button className="btn btn-default" type="submit">Login</button>
            <br />
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    );
  }

};

export default Login;
