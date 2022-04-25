import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

type Props = {
  control: any;
  name: string;
  type: string;
  label: string;
  variant?: 'standard' | 'outlined' | 'filled';
  isMultiline?: boolean;
};

const TextInput = ({ control, name, type, label, isMultiline, variant = 'outlined' }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            fullWidth
            autoComplete={name}
            type={type}
            label={label}
            onChange={onChange}
            multiline={isMultiline}
            variant={variant}
            value={value}
            error={Boolean(error?.message)}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};

export default TextInput;
