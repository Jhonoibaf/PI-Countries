import './App.css';
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './Components/Landingpage';
import Home from './Components/Home';
import CreateActivity from './Components/CreateActivity';
import Detail from './Components/Detail'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' exact component={LandingPage}></Route>
          <Route path='/home' exact component={Home}></Route>
          <Route path='/create' exact component={CreateActivity}></Route>
          <Route path="/home/:id" exact  component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
