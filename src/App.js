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
import { useSelector } from 'react-redux';
import Error from './components/Error/Error';
import LandingPage from './components/LandingPage/LandingPage';
import Loading from './components/Loading/Loading';
import BulkActivities from './components/Activities/BulkActivities';
//sad
function App() {
  const displayFilters = useSelector(store => store.displayFilters)
  const displayError = useSelector(store => store.displayError)
  const bulkCreateMode = useSelector(store => store.bulkCreateMode)
  const loading = useSelector(store => store.loading)

  return (
    <Router>
      {
        <div className="App" >
          {displayError ? <Error /> : null}{/*se debe de cerrar haciendo click*/}
          {loading ? <Loading /> : null} {/*se cierra sola a los 30s*/}

          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/about">
              <NavBar />
              <About />
            </Route>
            <Route exact path="/countries/details">
              <NavBar />
              <CountryDetails />
              <Activities filtered={true} />
            </Route>
            <Route exact path="/countries">
              <NavBar />
              {displayFilters ? <FilterBar /> : null}

              <Countries />
              <PageBar />
            </Route>

            <Route exact path="/activities">
              <NavBar />
              {bulkCreateMode ? <BulkActivities /> :
                <CreateActivity filtered={false} />}
              {bulkCreateMode ? null :
                <Activities filtered={false} />}


            </Route>
          </Switch>

        </div>
      }
    </Router>
  );
}

export default App;
