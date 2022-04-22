import { useEffect, Suspense } from 'react';
import { Route, RouteProps, useNavigate } from 'react-router-dom';
import { Spinner } from 'components/molecules';

interface IProps extends RouteProps {}

export const PublicRoute = (props: IProps) => {
  const navigate = useNavigate();

  /*
  Later we need to access the user's token and check if it's valid.
  */
  const token = { token: '0557692809' };

  useEffect(() => {
    if (token?.token) {
      navigate('/');
    }
  }, [navigate, token?.token]);

  if (token?.token) {
    return null;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Route {...props} />
    </Suspense>
  );
};
