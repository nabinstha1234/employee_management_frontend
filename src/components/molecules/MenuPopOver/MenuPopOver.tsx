import React from 'react';
import { Popover } from '@mui/material';

import { ArrowStyle } from './styles';

type Props = {
  children: React.ReactNode;
  sx?: object;
  open: boolean;
  onClose: () => void;
  anchorEl: any;
};

const MenuPopOver = ({ children, sx, open, onClose, anchorEl, ...rest }: Props) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: 'inherit',
          border: (theme) => `solid 1px ${theme.palette.grey[500]}`,
          width: 200,
          ...sx,
        },
      }}
      {...rest}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
};

export default MenuPopOver;
