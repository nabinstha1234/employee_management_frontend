import React from 'react';
import { Icon } from '@iconify/react';
import { Box } from '@mui/material';

type Props = {
  icon: string;
  sx?: object;
  other?: object;
};

const ReactIcon = ({ icon, sx, other }: Props) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
};

export default ReactIcon;
