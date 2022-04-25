import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { TextInput, MuiDatePicker } from 'components/molecules';

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

const CreateEmployeeSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

type Props = {};

const AddEmployee = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(CreateEmployeeSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = () => {
    setIsSubmitting(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <TextInput control={control} name="firstName" label="First Name" type="text" />
          <TextInput control={control} name="lastName" label="Last Name" type="text" />
        </Stack>
        <TextInput control={control} name="email" label="Email" type="email" />
        <TextInput control={control} name="employeeId" label="Employee Number" type="text" />
        <TextInput control={control} name="department" label="Department Name" type="text" />
        <TextInput control={control} name="phone" label="Phone Number" type="text" />
        <TextInput control={control} name="address" label="Address" type="text" />
        <TextInput control={control} name="zipCode" label="Zip Code" type="text" />
        <TextInput control={control} name="remarks" isMultiline label="Remarks" type="text" />
        <MuiDatePicker control={control} type="text" name="dateOfBirth" label="Date of Birth" />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Submit
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default AddEmployee;
