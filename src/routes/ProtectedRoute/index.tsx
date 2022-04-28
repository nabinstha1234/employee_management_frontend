import React, { Suspense, useEffect } from 'react';
import { Route, RouteProps, Redirect, useHistory } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';

import { Spinner } from 'components/molecules';
import { AuthLayout } from 'components/organisms';
import auth from 'config/auth';
import { getCurrentUser } from 'features/auth/Api/auth';
import routes from 'config/routes';

interface IProps extends RouteProps {
  roles?: string[];
  Component: React.FC<RouteProps>;
}

export const ProtectedRoute = ({ Component, exact, path, roles }: IProps) => {
  const history = useHistory();
  const isAuthed = auth.isAuthenticated();
  const dispatch = useAppDispatch();

  const { userResponse } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthed) {
      (async () => {
        const response = await dispatch(getCurrentUser());
        if (response.meta.requestStatus !== 'fulfilled') {
          history.push(routes.login.path);
        }
      })();
    }
  }, [isAuthed, history, dispatch]);

  useEffect(() => {
    if (isAuthed && !isEmpty(userResponse)) {
      if (!userResponse.status || userResponse.status !== 'active') {
        history.push(routes.passwordChange.path);
      }
    }
  }, [isAuthed, history, userResponse]);

  if (isAuthed && isEmpty(userResponse)) {
    return null;
  }

  const userHasRequiredRole = isAuthed && roles && roles.includes(userResponse?.role);

  return (
    <AuthLayout>
      <React.Fragment>
        <Suspense fallback={<Spinner />}>
          <Route
            exact={exact}
            path={path}
            render={(props: RouteProps) =>
              userHasRequiredRole ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: isAuthed ? routes.home.path : routes.login.path,
                    state: {
                      requestedPath: path,
                    },
                  }}
                />
              )
            }
          />
        </Suspense>
      </React.Fragment>
    </AuthLayout>
  );
};
