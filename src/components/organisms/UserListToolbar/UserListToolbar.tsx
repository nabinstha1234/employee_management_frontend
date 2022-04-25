import React from 'react';
import { Tooltip, IconButton, Typography, InputAdornment } from '@mui/material';

import { ReactIcon } from 'components/molecules';

import { RootStyle, SearchStyle } from './style';

type Props = {
  numSelected: number;
  filterName: string;
  onFilterName: (e: any) => void;
};

const UserListToolbar = ({ numSelected, filterName, onFilterName }: Props) => {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <ReactIcon icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <ReactIcon icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <ReactIcon icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
};

export default UserListToolbar;
