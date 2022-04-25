import React from 'react';
import { Paper, Typography } from '@mui/material';

type Props = {
  searchQuery: string;
};

const SearchNotFound = ({ searchQuery }: Props) => {
  return (
    <Paper>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </Paper>
  );
};

export default SearchNotFound;
