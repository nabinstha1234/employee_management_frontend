import React from 'react';
import { RootStyle } from './styles';

type Props = {
  children: React.ReactChild;
  color: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  variant: 'filled' | 'outlined' | 'ghost';
};

const Label = ({ children, color = 'default', variant = 'ghost' }: Props) => {
  return <RootStyle ownerState={{ color, variant }}>{children}</RootStyle>;
};

export default Label;
