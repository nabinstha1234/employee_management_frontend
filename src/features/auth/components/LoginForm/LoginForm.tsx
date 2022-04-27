import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm, SubmitHandler, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from "react-hot-toast";
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

import { ReactIcon } from 'components/molecules';
import AuthService from "features/auth/Api/authService"
import {setToken} from "utils/token"
import config from "config";
import routes from 'config/routes';

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

  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(LoginSchema),
  });

  const isCheckedRememberMe = useWatch({
    control,
    name: 'rememberMe',
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onSubmit: SubmitHandler<IFormInput> = (input:IFormInput) => {
    setIsSubmitting(true);
    AuthService.login(input).then((response)=>{
        toast.success("Logged in successfully!")
        const {data} = response;
        if(data) {
            setToken({name: config.tokenName, value: data.token})
            history.push(routes.home.path)
        }
    }).catch((err)=>{
        toast.error("Email and password do not match.")
    })
   setIsSubmitting(false)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                fullWidth
                autoComplete="username"
                type="email"
                label="Email address"
                onChange={onChange}
                value={value}
                error={Boolean(error?.message)}
                helperText={error?.message}
              />
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              autoComplete="current-password"
              onChange={onChange}
              value={value}
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
              error={Boolean(error?.message)}
              helperText={error?.message}
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
              control={<Checkbox {...field} checked={isCheckedRememberMe} />}
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
