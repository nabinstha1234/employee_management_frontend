import { Suspense } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { Spinner } from 'components/molecules';

interface IProps extends RouteProps {}

export const ProtectedRoute = (props: IProps) => {
  /*
    TODO: Add a check to see if the user is authenticated. Roles cames from props. Check user group here in oreder to give right access to the particular route.
    */
  return (
    <Suspense fallback={<Spinner />}>
      <Route {...props} />
    </Suspense>
  );
};