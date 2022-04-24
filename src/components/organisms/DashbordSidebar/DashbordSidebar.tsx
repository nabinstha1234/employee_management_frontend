import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Drawer } from '@mui/material';

import { Logo, ScrollBar } from 'components/molecules';
import { NavSection } from 'components/organisms';
import { useResponsive } from 'hooks';
import sidebarConfig from 'config/SidebarConfig';

import { RootStyle, DRAWER_WIDTH } from './style';

type Props = {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

const DashbordSidebar = ({ isOpenSidebar, onCloseSidebar }: Props) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg', '', '');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <ScrollBar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </ScrollBar>
  );
  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

export default DashbordSidebar;
