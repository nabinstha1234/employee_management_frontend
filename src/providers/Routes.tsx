import React from 'react';
import { BrowserRouter as Router, Routes as Switch } from 'react-router-dom';

import routes from 'config/routes';

import { ProtectedRoute } from 'routes';

/*
########################
You can pass role to the ProtectedRoute component to restrict access to the route.
TODO: add role props in protected route and validate it in the component.
########################
*/

export const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* <PublicRoute exact path={routes.login.path} component={routes.login.component} /> */}
        <ProtectedRoute path={routes.home.path} element={routes.home.component} />
      </Switch>
    </Router>
  );
};
