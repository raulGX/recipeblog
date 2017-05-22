import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-default">
        <ul className="nav navbar-nav">
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/recipes" activeClassName="active">Recipes</NavLink></li>
          <li><NavLink to="/ingredients" activeClassName="active">Ingredients</NavLink></li>
          <li><NavLink to="/categories" activeClassName="active">Ingredient Categories</NavLink></li>

        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
