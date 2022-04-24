import { Link as RouterLink } from 'react-router-dom';
import { Stack, Link, Container, Typography } from '@mui/material';

import { LoginForm } from '../../components';

import { ContentStyle, RootStyle } from './styles';

type Props = {};

const Login = (props: Props) => {
  return (
    <RootStyle title="Login">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to GreenerHRM
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>

          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' },
            }}
          >
            Don’t have an account?&nbsp;
            <Link variant="subtitle2" component={RouterLink} to="register" underline="hover">
              Get started
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Login;
