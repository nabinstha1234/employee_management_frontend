import { useState } from 'react';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';

import { ReactIcon } from 'components/molecules';

import { SearchbarStyle } from './style';

type Props = {};

const SearchBar = (props: Props) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButton onClick={handleOpen}>
            <ReactIcon icon="eva:search-fill" width={20} height={20} />
          </IconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <ReactIcon
                    icon="eva:search-fill"
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
};

export default SearchBar;
