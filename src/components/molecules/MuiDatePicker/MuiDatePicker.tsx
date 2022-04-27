import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

type Props = {
  control: any;
  label: string;
  name: string;
  type: string;
  setValue:Function
};

const MuiDatePicker = ({ control, label, name, type, setValue:hookFormSetValue }: Props) => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="For desktop"
        value={value}
        minDate={new Date('2017-01-01')}
        onChange={(newValue) => {
          setValue(newValue);
          hookFormSetValue(name, value, { shouldValidate: true, shouldDirty: true });

        }}
        renderInput={(params) => (
          <Controller
            control={control}
            name={name}
            render={({fieldState: { error } }) => {
              return (
                <TextField
                  fullWidth
                  {...params}
                  autoComplete={name}
                  type={type}
                  label={label}
                  value={value}
                  error={Boolean(error?.message)}
                  helperText={error?.message}
                />
              );
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default MuiDatePicker;
