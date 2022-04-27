import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {useHistory} from "react-router-dom"
import toast from "react-hot-toast";

import { TextInput,MuiSelect } from 'components/molecules';
import {useAppDispatch, useAppSelector} from "app/hooks";
import {createUser} from "../../Api/users"

import routes from "config/routes";
import config from "config";
import {RootState} from "app/store";
import {ICompany} from "../../../company/Slice/CompanySlice";
import {listCompanies} from "features/company/Api/company"

interface IFormInput {
  firstname: string;
  middlename: string;
  lastname:string;
  email: string;
  role:string;
  company:number;
}

const CreateUserSchema = Yup.object().shape({
  firstname:Yup.string().required("First name is required"),
  lastname:Yup.string().required("Lasr name is required"),
  email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  role: Yup.string().required("Role is required"),
  company: Yup.number().required("Company is reuired")
});

type Props = {
  setShowDialog:Function;
};

const Roles =[
  {
    label:"Super Admin",
    value:config.roles.SuperAdmin
  },
  {
    label:"Admin",
    value:config.roles.Admin
  },
  {
    label:"Employee",
    value: config.roles.Employee
  }
]

const AddUser = ({setShowDialog}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { control, handleSubmit} = useForm<IFormInput>({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(CreateUserSchema),
  });
  const dispatch = useAppDispatch()
  const history = useHistory()

  const { companies } = useAppSelector((state:RootState)=> state.company)

  useEffect(()=>{
    dispatch(listCompanies())
  },[dispatch])

  const onSubmit: SubmitHandler<IFormInput> = async (data:IFormInput) => {
    setIsSubmitting(true);
    dispatch(createUser(data)).unwrap().then((response)=>{
        toast.success("User Created Successfully")
        setShowDialog(false)
    }).catch(()=>{
      toast.error("Something went wrong!")
    })
    setIsSubmitting(false)
  };

  const companiesList = companies.map((item:ICompany)=>({label:item.name,value:item.id}))

  return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={2}>
                <TextInput control={control} name="firstname" label="First Name" type="text" />
                <TextInput control={control} name="middlename" label="Middle Name" type="text" />
                <TextInput control={control} name="lastname" label="Last Name" type="text" />
              </Stack>
              <TextInput control={control} name="email" label="Email" type="email" />
              <MuiSelect control={control} name="role" label="Role" items={Roles}/>
              <MuiSelect control={control} name="company" label="Company" items={companiesList}/>
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

export default AddUser;