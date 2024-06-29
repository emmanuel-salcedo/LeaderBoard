// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Leaderboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
