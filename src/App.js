import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"; 
import NavBar from "./components/NavBar/NavBar"
import Countries from './components/Countries/Countries'
import FilterBar from './components/FilterBar/FilterBar'
import PageBar from './components/PageBar/PageBar';
// import background from "./img/background.png";
import About from './components/About/About';
import Activities from './components/Activities/Activities';
import { useSelector } from 'react-redux';

function App() {
  const background = useSelector(state => state.background);
  console.log(background);
  return (
    <Router>
      <NavBar />
      <div className="App" style={{ backgroundImage: `url(/img/${background}.png) ,url(/img/background.png)` }}>
        <Switch>
          <Route exact path="/countries">
            <FilterBar />
            <div >
              <PageBar />
              <Countries />
            </div>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/activities">
            <Activities />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
