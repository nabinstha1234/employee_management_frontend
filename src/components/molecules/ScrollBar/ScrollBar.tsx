import React from 'react';
import { Box } from '@mui/material';

import { RootStyle, SimpleBarStyle } from './style';

type Props = {
  children: React.ReactNode;
  sx?: object;
  other?: object;
};

const ScrollBar = ({ children, sx, other }: Props) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
};

export default ScrollBar;
