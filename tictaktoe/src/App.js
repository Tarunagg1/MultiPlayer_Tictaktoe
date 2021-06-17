import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Game from './components/Game';
import Join from './components/Join';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Join} />
          <Route path="/game" exact component={Game} />
          
        </Switch>
      </Router> 
    </>
  );
}

export default App;
