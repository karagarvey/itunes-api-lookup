import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import createMemoryHistory from 'history/createMemoryHistory';
const history = createMemoryHistory();

import App from './app';

ReactDOM.render(
  <Router history={history}>
    <Route>
      <App />
    </Route>
  </Router>,
  document.getElementById('app')
);
