import Navbar from 'react-bootstrap/Navbar'
import logo from '../logo.svg';
import './App.scss';
import Search from './pages/search/Search';

function App() {
  return (
    <div className="App" className="h-100 bg-light">
      <Navbar bg="primary" sticky="top">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
      Cooking React
    </Navbar.Brand>
      </Navbar>
      <Search></Search>
    </div>
  );
}

export default App;
