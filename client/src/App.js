import React from 'react';
import './App.css';
import Login from './components/Login'
import { BrowserRouter, Route } from 'react-router-dom';
import Register from './components/Register';
import Vacations from './components/Vacations';
import VacationsAdmin from './components/VacationsAdmin';
import Home from './components/Home';
import SearchResults from './components/SearchResults';



function App() {

  return (
    <BrowserRouter>

      <div className="App">

        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/vacations">
          <Vacations />
        </Route>

        <Route exact path="/vacations/admin">
          <VacationsAdmin />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/search">
          <SearchResults />
        </Route>

      </div>

    </BrowserRouter>
  );
}

export default App;

