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
import CreateActivity from './components/Activities/CreateActivity'
import CountryDetails from './components/CountryDetails/CountryDetails';
//sad
function App() {
  return (
    <Router>
      <NavBar />
      <div className="App" >
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/countries/details">
            <CountryDetails />
            <Activities filtered={true}/>
          </Route>
          <Route exact path="/countries">
            <div className="rutacountries">
              <FilterBar />
              <div >
                <PageBar />
                <Countries />
              </div>
            </div>
          </Route>

          <Route exact path="/activities">
            <div className="rutaactivities">
              <Activities filtered={false}/>
              <CreateActivity />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
