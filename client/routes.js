import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { SearchResults } from './components';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/search/:artistName" component={SearchResults} />;
      </Switch>
    );
  }
}

export default Routes;
