import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { MarketingApp, Header } from './components';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MarketingApp />
    </BrowserRouter>
  );
};
