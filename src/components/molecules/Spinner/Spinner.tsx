import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const sizes = {
  sm: 'h4',
  md: 'h3',
  lg: 'h2',
  xl: 'h1',
};

const variants = {
  light: 'text-white',
  primary: 'text-primary',
};

export type SpinnerProps = {
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const Spinner = ({ size = 'md', variant = 'primary', className = '' }: SpinnerProps) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" size={size} />
    </Backdrop>
  );
};
