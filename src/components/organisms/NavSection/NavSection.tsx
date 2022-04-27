import { matchPath, useLocation } from 'react-router-dom';
import { Box, List } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';

import NavItem from './NavItem';

type Props = {
  navConfig: any;
  other?: any;
};

const NavSection = ({ navConfig, other }: Props) => {
  const { pathname } = useLocation();
  const match = (path: any) => (path ? !!matchPath(path, pathname) : false);
  const {
    userResponse: { role },
  } = useAppSelector((state: RootState) => state.auth);

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item: any) => {
          if (item.roles.includes(role)) {
            return <NavItem key={item.title} item={item} active={match} />;
          }
          return null;
        })}
      </List>
    </Box>
  );
};

export default NavSection;
