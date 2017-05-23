import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.state = { showMenu: false }
    this.showMenu = false
  }
  toggleMenu() {
    if (this.showMenu === false) {
      this.showMenu = true
    }
    else {
      this.showMenu = false
    }
    this.setState({ ...this.state, showMenu: this.showMenu })
  }
  logout() {
    localStorage.clear()
  }
  render() {
    let loginSide;
    if (!localStorage.getItem("token")) {
      loginSide =
        <ul className="nav navbar-nav navbar-right">
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        </ul>
    }
    else {
      loginSide =
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" onClick={this.toggleMenu} role="button">My account <span className="caret"></span></a>
            <ul ref={input => this.menu = input} onClick={this.toggleMenu} className={"dropdown-menu display-" + this.state.showMenu}>
              <li><NavLink to="/myrecipes" activeClassName="active">My Recipes</NavLink></li>
              <li><NavLink to="/" onClick={this.logout} activeClassName="active">Logout</NavLink></li>
            </ul>
          </li>
        </ul>
    }
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/recipes" activeClassName="active">Recipes</NavLink></li>
            <li><NavLink to="/ingredients" activeClassName="active">Ingredients</NavLink></li>
            <li><NavLink to="/categories" activeClassName="active">Ingredient Categories</NavLink></li>
          </ul>
          {loginSide}
        </nav>
      </div>
    );
  }
};

export default Header;
