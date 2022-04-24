import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

import logo from 'assets/images/svg/grenner-logo.svg';

type Props = {
  styles?: object;
};

const Logo = ({ styles }: Props) => {
  return (
    <RouterLink to="/">
      <Box component="img" src={logo} sx={{ height: 40, ...styles }} />
    </RouterLink>
  );
};

export default Logo;
