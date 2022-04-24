import React from 'react';
import { Logo } from 'components/molecules';

import { HeaderStyle } from './HeaderStyle';

type Props = {};

const UnAuthLayout = (props: Props) => {
  return (
    <HeaderStyle>
      <Logo />
    </HeaderStyle>
  );
};

export default UnAuthLayout;
