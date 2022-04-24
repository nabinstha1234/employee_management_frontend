import React from 'react';
import { Box, Stack, IconButton } from '@mui/material';

import { ReactIcon, SearchBar } from 'components/molecules';
import { AccountPopover, LanguageProvider } from 'components/organisms';

import { RootStyle, ToolbarStyle } from './styles';

type Props = {
  onOpenSideBar: (e: any) => void;
};

const DashboradNav = ({ onOpenSideBar }: Props) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSideBar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <ReactIcon icon="eva:menu-2-fill" />
        </IconButton>

        <SearchBar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <LanguageProvider />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboradNav;
