/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';

import {
  Search as SearchIcon,
  CloseOutlined as CloseOutlinedIcon,
} from '@mui/icons-material';

import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import {
  ClickAwayListener,
  Box,
  InputBase,
  IconButton,
  Snackbar,
} from '@mui/material';

const useStyles = makeStyles()((theme) => ({
  search: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: theme.spacing(1),
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    flex: 1,
    alignItems: 'center',
  },
  inputInput: {
    width: '100%',
  },
}));

function SearchInput({ onSearchClose }) {
  const { classes } = useStyles();
  const theme = useTheme();

  const [isFocussed, setFocussed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShowingToast, showToast] = useState(false);
  const onSearchCancel = () => {
    setSearchTerm('');
    setFocussed(false);
    onSearchClose();
  };
  const onSearch = (event) => {
    setFocussed(true);
    if (event.key === 'Enter') {
      showToast(true);
      setFocussed(false);
      onSearchClose();
    }
  };
  const onFocusLoss = () => {
    onSearchClose();
    setFocussed(false);
  };
  const handleToastClose = () => {
    showToast(false);
  };

  return (
    <ClickAwayListener onClickAway={onFocusLoss}>
      <Box
        className={classes.search}
        borderRadius={theme.shape.borderRadius}
        bgcolor={
          isFocussed
            ? theme.palette.background.default
            : theme.palette.grey[200]
        }
        boxShadow={isFocussed ? 2 : 0}
        height="3rem"
      >
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={searchTerm}
          onClick={() => setFocussed(true)}
          inputProps={{ 'aria-label': 'search' }}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={onSearch}
        />
        {isFocussed ? (
          <IconButton hidden={!isFocussed} onClick={onSearchCancel}>
            <CloseOutlinedIcon
            // htmlColor={theme.custom.palette.iconColor}
            />
          </IconButton>
        ) : null}
        <Snackbar
          open={isShowingToast}
          message="Search not implemented ;)"
          autoHideDuration={2000}
          onClose={handleToastClose}
        />
      </Box>
    </ClickAwayListener>
  );
}

export default SearchInput;
