import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Search, SearchResults, PageNotFound } from './components';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/search" component={SearchResults} />;
          <Route path="/" component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
