import { useState, useRef } from 'react';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import {useAppSelector} from "app/hooks"
import {RootState} from "app/store";
import {upperFirst} from 'lodash'

import { ReactIcon, MenuPopOver } from 'components/molecules';


type Props = {};

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    linkTo: '#',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

const AccountPopover = (props: Props) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const {userResponse} = useAppSelector((state:RootState)=>state.auth)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <Avatar src={''} alt="photoURL" />
      </IconButton>

      <MenuPopOver
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {upperFirst(userResponse.firstname)} {upperFirst(userResponse.lastname)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userResponse.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <ReactIcon
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopOver>
    </>
  );
};

export default AccountPopover;
