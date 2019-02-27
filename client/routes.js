import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SearchResults } from './components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/search/:artistName/after/:startDate?/before/:endDate?"
          component={SearchResults}
        />
        ;
      </Switch>
    );
  }
}

export default Routes;
