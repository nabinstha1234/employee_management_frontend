import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from 'config/routes';

import { ProtectedRoute, PublicRoute } from 'routes';

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
        <React.Fragment>
          <PublicRoute exact path={routes.login.path} component={routes.login.component} />
          <ProtectedRoute path={routes.home.path} component={routes.home.component} />
          {/* <BaseRoute path={routes.page404.path} component={routes.page404.component} /> */}
        </React.Fragment>
      </Switch>
    </Router>
  );
};
