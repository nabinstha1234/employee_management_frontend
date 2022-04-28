import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Stack, Typography, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { UnAuthLayout } from 'components/organisms';
import { useAppDispatch } from 'app/hooks';
import { acceptToken } from '../../Api/auth';
import AuthService from 'features/auth/Api/authService';

import { ContentStyle, RootStyle } from '../Login/styles';
import toast from 'react-hot-toast';

type Props = {};

const AcceptInvitation = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { token } = useParams<any>();

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(acceptToken({ token }))
      .unwrap()
      .then((response: any) => {
        setLoading(false);
        setSuccess(true);
        const { email, temp_password } = response?.data;

        AuthService.login({
          email,
          password: temp_password,
        })
          .then(() => {
            history.push('/password-change', {
              temp_password,
            });
          })
          .catch(() => {
            toast.error('Something went wrong');
          });
      })
      .catch((err) => {
        setLoading(false);
        setSuccess(false);
        setError('Token expired');
        toast.error('Something went wrong');
      });
  }, [dispatch, token, history]);

  return (
    <>
      <UnAuthLayout />
      <RootStyle title="Password change">
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ mb: 5 }}>
              <Typography variant="h4" gutterBottom>
                We all setup!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Please Wait</Typography>
            </Stack>

            {loading && (
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="success" />
              </Stack>
            )}

            {success && (
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <Alert severity="success" color="success">
                  All setup , Please wait we are redirecting you to next page!
                </Alert>
              </Stack>
            )}
            {error && (
              <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <Alert severity="error" color="success">
                  {error}
                </Alert>
              </Stack>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </>
  );
};

export default AcceptInvitation;
