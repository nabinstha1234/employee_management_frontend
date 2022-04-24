import { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';

import JapanFlag from 'assets/images/svg/japan-fl.svg';
import UkFlag from 'assets/images/svg/uk-fl.svg';

import { MenuPopOver } from 'components/molecules';

type Props = {};

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: UkFlag,
  },
  {
    value: 'jp',
    label: 'Japanese',
    icon: JapanFlag,
  },
];

const LanguageProvider = (props: Props) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

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
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>

      <MenuPopOver open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              onClick={handleClose}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} height={20} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopOver>
    </>
  );
};

export default LanguageProvider;
