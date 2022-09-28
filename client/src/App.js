import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './Components/Landingpage';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact component={LandingPage}></Route>
          <Route path='/home' exact component={Home}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
