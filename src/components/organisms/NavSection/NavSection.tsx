import { matchPath, useLocation } from 'react-router-dom';
import { Box, List } from '@mui/material';

import NavItem from './NavItem';

type Props = {
  navConfig: any;
  other?: any;
};

const NavSection = ({ navConfig, other }: Props) => {
  const { pathname } = useLocation();
  const match = (path: any) => (path ? !!matchPath(path, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item: any) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
