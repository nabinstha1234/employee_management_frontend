import {  Suspense } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Spinner } from 'components/molecules';
import { UnAuthLayout } from 'components/organisms';
import routes from "config/routes";
import config from "config";
import {getToken} from "utils/token";

interface IProps extends RouteProps {}

export const PublicRoute = (props: IProps) => {
    const navigate = useHistory();
    const token = getToken({ name: config.tokenName });

    if (token) {
        navigate.push(routes.home.path);
    }
    return (
        <Suspense fallback={<Spinner />}>
          <UnAuthLayout />
          <Route {...props} />
        </Suspense>
      );
};
