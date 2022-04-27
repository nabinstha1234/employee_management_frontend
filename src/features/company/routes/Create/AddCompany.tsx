import * as Yup from 'yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Container, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {useHistory} from "react-router-dom"

import { TextInput, MuiDatePicker, Page } from 'components/molecules';
import { useAppDispatch} from "app/hooks";
import {createCompany} from "../../Api/company"
import toast from "react-hot-toast";
import routes from "../../../../config/routes";

interface IFormInput {
  name: string;
  name_kana: string;
  email: string;
  address:string;
  zip_code:string;
  phone:string;
  url_of_hp:string;
  date_of_establishment:string;
  remarks:string;
}

const CreateEmployeeSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  name:Yup.string().required("Name is Required"),
  address:Yup.string().required("Address is required"),
  phone:Yup.string().required("Phone is required").min(10).max(13),
  url_of_hp:Yup.string().required("This field is required"),
});

type Props = {};

const AddCompany = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit, setValue } = useForm<IFormInput>({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(CreateEmployeeSchema),
  });
  const dispatch = useAppDispatch()
  const history = useHistory()

  const onSubmit: SubmitHandler<IFormInput> = async (data:IFormInput) => {
    setIsSubmitting(true);
    dispatch(createCompany(data)).then((response)=>{
      toast.success("Company Created Successfully")
      history.push(routes.company.path)
    }).catch(()=>{
      toast.error("Something went wrong!")
    })
    setIsSubmitting(false)
  };

  return (
    <Page title="Companies">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Add Company
          </Typography>
        </Stack>
        <Card
          sx={{
            p: 3,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextInput control={control} name="name" label="Company Name" type="text" />
                <TextInput control={control} name="name_kana" label="Company Name Kana" type="text" />
              </Stack>
              <TextInput control={control} name="email" label="Email" type="email" />
              <TextInput control={control} name="zip_code" label="Zip Code" type="text" />
              <TextInput control={control} name="phone" label="Phone Number" type="number" />
              <TextInput control={control} name="address" label="Address" type="text" />
              <TextInput control={control} name="url_of_hp" label="URL of HP" type="text" />
              <MuiDatePicker
                  control={control}
                  type="text"
                  name="date_of_establishment"
                  label="Date of Establishment"
                  setValue={setValue}
              />
              <TextInput control={control} name="remarks" isMultiline label="Remarks" type="text" />

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
        </Card>
      </Container>
    </Page>
  );
};

export default AddCompany;
