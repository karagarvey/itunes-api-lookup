import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SearchResults } from './components';

class Routes extends Component {
  render() {
    return <Route path="/search/:artistName/" component={SearchResults} />;
  }
}

export default Routes;
