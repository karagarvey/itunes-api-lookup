import React from 'react';

import { Search, WelcomeBanner } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <WelcomeBanner />
      <Search />
      <Routes />
    </div>
  );
};

export default App;
