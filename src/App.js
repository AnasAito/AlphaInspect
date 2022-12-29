import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Targets from './screens/targets';
import Spotlight from './screens/spotlight';
import Analysis from './screens/analysis';
import Login from './screens/login'
const App = () => {
  // console.log('ressources', ressources);
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
      <Route path="/login">
          <Login />
        </Route>
        <Route path="/analysis">
          <Analysis />
        </Route>
        <Route path="/spotlight/:id">
          <Spotlight />
        </Route>

        <Route path="/targets">
          <Targets />
        </Route>

        <Route path="/">
          <Targets />
        </Route>

        {/* <Route path="/">
          <div>api test </div>
        </Route> */}
      </Switch>
    </Router>
  );
};

export default App;
