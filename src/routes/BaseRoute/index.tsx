import { Suspense, Fragment } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { Spinner } from 'components/molecules';

interface IProps extends RouteProps {}

export const BaseRoute = (props: IProps) => {
  return (
    <Fragment>
      <Suspense fallback={<Spinner />}>
        <Route path={props.path} component={props.component} exact={props.exact} />
      </Suspense>
    </Fragment>
  );
};
