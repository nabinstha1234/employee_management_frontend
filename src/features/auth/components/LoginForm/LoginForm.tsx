import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReactIcon } from 'components/molecules';

type Props = {};

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = (props: Props) => {
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<IFormInput>({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(LoginSchema),
  });

  const isCheckedRemberMe = useWatch({
    control,
    name: 'rememberMe',
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onSubmit: SubmitHandler<IFormInput> = () => {
    setIsSubmitting(true);
    history.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...field}
              error={Boolean(isDirty && errors.email)}
              helperText={isDirty && errors.email}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <ReactIcon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(isDirty && errors.password)}
              helperText={isDirty && errors.password}
            />
          )}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Controller
          control={control}
          name="rememberMe"
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox checked={isCheckedRemberMe} />}
              label="Remember me"
            />
          )}
        />

        <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
