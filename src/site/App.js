import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.scss';
import Search from './pages/search/Search';
import Icon from '@mdi/react';
import { mdiMagnify, mdiStar, mdiHistory, mdiAccount, mdiSilverwareForkKnife } from '@mdi/js';
import { Link, Route, BrowserRouter, Switch, useParams } from 'react-router-dom';
import History from './pages/history/History';
import Favourites from './pages/favourite/Favourite';
import Recipe from './pages/recipe/Recipe';
import React from 'react';
import Preference from './pages/preference/Preference';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App h-100 bg-light">
          <Navbar bg="primary" sticky="top" expand="md">
            <Navbar.Brand href="/" className="mr-auto text-light">
              <Icon path={mdiSilverwareForkKnife}></Icon>
            Cooking React
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Link to="/" className="text-light nav-link"><Icon path={mdiMagnify}></Icon> Search</Link>
                <Link to="/favourites" className="text-light nav-link"><Icon path={mdiStar}></Icon> Favourite</Link>
                <Link to="/history" className="text-light nav-link"><Icon path={mdiHistory}></Icon> History</Link>
                <Link to="/Preferences" className="text-light nav-link"><Icon path={mdiAccount}></Icon> Preference</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route path="/Preferences">
              <Preference />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/favourites">
              <Favourites />
            </Route>
            <Route path="/recipe/:id">
              <ShowRecipe />
            </Route>
            <Route path="/">
              <Search />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function ShowRecipe() {
  let { id } = useParams();
  return <Recipe id={id} />;
}

export default App;
