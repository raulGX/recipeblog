import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import Header from './components/common/Header';
import Login from './components/common/Login';
import Register from './components/common/Register';
import HomePage from './components/home/HomePage';
import RecipePage from './components/recipes/RecipePage';
import MyRecipes from './components/recipes/MyRecipes';
import MyRecipe from './components/recipes/MyRecipe';
import SpecificRecipePage from './components/recipes/SpecificRecipePage';

import IngredientsPage from './components/ingredients/IngredientsPage';
import CategoriesPage from './components/categories/CategoriesPage';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

render(
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path='/' component={HomePage} />
      <Route exact path='/recipes' component={RecipePage} />
      <Route exact path='/myrecipes' component={MyRecipes} />
      <Route path='/myrecipes/:recipeId' component={MyRecipe} />
      <Route path='/recipes/:recipeId' component={SpecificRecipePage} />
      <Route path='/ingredients' component={IngredientsPage} />
      <Route path='/categories' component={CategoriesPage} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
