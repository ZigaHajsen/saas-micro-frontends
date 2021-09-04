import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import { Header, Progress } from './components';

const MarketingAppLazy = lazy(() => import('./micro-frontends/MarketingApp'));
const AuthAppLazy = lazy(() => import('./micro-frontends/AuthApp'));
const DashboardAppLazy = lazy(() => import('./micro-frontends/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

const history = createBrowserHistory();

export const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path='/auth'>
              <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path='/dashboard'>
              {!isSignedIn && <Redirect to='/' />}
              <DashboardAppLazy />
            </Route>
            <Route path='/' component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </Router>
    </StylesProvider>
  );
};
