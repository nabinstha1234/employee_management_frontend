import { forwardRef } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: React.ReactNode;
  title: string;
};

const Page = forwardRef<any, Props>(({ children, title = '', ...other }, ref) => (
  <Box ref={ref} {...other}>
    <title>{title}</title>
    {children}
  </Box>
));

export default Page;
