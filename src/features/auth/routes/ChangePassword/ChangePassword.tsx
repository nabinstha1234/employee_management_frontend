import {Link as RouterLink} from 'react-router-dom';
import {Container, Link, Stack, Typography} from '@mui/material';
import {UnAuthLayout} from 'components/organisms';

import {PasswordChangeForm} from '../../components';

import {ContentStyle, RootStyle} from '../Login/styles';

type Props = {};

const ChangePassword = (props: Props) => {
    return (
        <>
            <UnAuthLayout/>
            <RootStyle title="Password change">
                <Container maxWidth="sm">
                    <ContentStyle>
                        <Stack sx={{mb: 5}}>
                            <Typography variant="h4" gutterBottom>
                                Change Password
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>Enter your details below.</Typography>
                        </Stack>

                        <PasswordChangeForm/>

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{
                                mt: 3,
                                display: {sm: 'none'},
                            }}
                        >
                            Remembered your password?&nbsp;
                            <Link variant="subtitle2" to="login" component={RouterLink} underline="hover">
                                Go to login
                            </Link>
                        </Typography>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </>
    );
};

export default ChangePassword;
