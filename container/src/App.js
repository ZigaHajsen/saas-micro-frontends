import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import { Header, Progress } from './components';

const MarketingAppLazy = lazy(() => import('./micro-frontends/MarketingApp'));
const AuthAppLazy = lazy(() => import('./micro-frontends/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path='/auth'>
              <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path='/' component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </StylesProvider>
  );
};
