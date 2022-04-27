import * as Yup from 'yup';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import toast from "react-hot-toast";
import {IconButton, InputAdornment, Stack, TextField,} from '@mui/material';
import {LoadingButton} from '@mui/lab';

import {ReactIcon} from 'components/molecules';
import {changePassword} from "../../Api/auth"
import {removeToken} from "utils/token"
import config from "config";
import routes from 'config/routes';
import {useAppDispatch} from "app/hooks"

type Props = {};

interface IFormInput {
    password: string;
    oldPassword: string;
    conformPassword: string;
}

const PasswordChangeSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Password is required'),
    password: Yup.string().required('Password is required'),
    conformPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Password is Required"),
});

const PasswordChangeForm = (props: Props) => {
    const history = useHistory();

    const [showPasswordOld, setShowPasswordOld] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useAppDispatch()

    const {control, handleSubmit} = useForm<IFormInput>({
        mode: 'onChange',
        shouldFocusError: true,
        resolver: yupResolver(PasswordChangeSchema),
    });

    const onSubmit: SubmitHandler<IFormInput> = (input: IFormInput) => {
        const inputData = {
            password: input.password,
            oldPassword: input.oldPassword
        }
        setIsSubmitting(true);
        dispatch(changePassword(inputData)).unwrap().then((resp) => {
            toast.success("Password Change Successfully")
            removeToken({name: config.tokenName});
            history.push(routes.login.path)
        }).catch((err) => {
            toast.error("Something went wrong.")
        })
        setIsSubmitting(false)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Controller
                    control={control}
                    name="oldPassword"
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField
                            fullWidth
                            autoComplete="current-password"
                            onChange={onChange}
                            value={value}
                            type={showPasswordOld ? 'text' : 'password'}
                            label="Current Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPasswordOld((show) => !show)} edge="end">
                                            <ReactIcon icon={showPasswordOld ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField
                            fullWidth
                            autoComplete="current-password"
                            onChange={onChange}
                            value={value}
                            type={showNewPassword ? 'text' : 'password'}
                            label="New Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowNewPassword((show) => !show)} edge="end">
                                            <ReactIcon icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="conformPassword"
                    render={({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField
                            fullWidth
                            autoComplete="current-password"
                            onChange={onChange}
                            value={value}
                            type={showConfirmPassword ? 'text' : 'password'}
                            label="Conform New Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword((show) => !show)} edge="end">
                                            <ReactIcon
                                                icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={Boolean(error?.message)}
                            helperText={error?.message}
                        />
                    )}
                />

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

export default PasswordChangeForm;
