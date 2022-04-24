import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

type Props = {
  control: any;
  name: string;
  rules?: any;
  isError?: boolean;
  isDirty?: boolean;
  error?: string;
};

const TextInput = ({ control, name, rules, isError, isDirty, error }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextField
          fullWidth
          //   autoComplete="username"
          //   type="email"
          //   label="Email address"
          error={Boolean(isDirty && isError)}
          helperText={isError && error}
        />
      )}
    />
  );
};

export default TextInput;
