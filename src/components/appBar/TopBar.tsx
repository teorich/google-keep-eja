/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';

import {
  AccountCircleOutlined as AccountsIcon,
  Brightness5Outlined as ToggleLightModeIcon,
  SearchOutlined as SearchIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

import {
  useScrollTrigger,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';

import SearchInput from './SearchInput';
import { useUiStore } from '../../context/globalStore';

const imgUrl = new URL('../../assets/logo.png', import.meta.url).href;

const useStyles = makeStyles()((theme) => ({
  grow: {
    flexGrow: 1,
  },
  containerBorder: {
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: theme.palette.divider,
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(1),
    },
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'stretch',
  },
  logo: {
    display: 'none',
    height: theme.spacing(5.5),
    padding: theme.spacing(0, 1, 0, 0),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title: {
    // ...theme.custom.fontFamily.metropolis,
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  searchbarContainer: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      flexGrow: 0,
      width: theme.spacing(90),
      marginLeft: theme.spacing(9),
    },
  },
}));

function LogoContainer() {
  const { classes } = useStyles();
  return (
    <div className={classes.logoContainer}>
      <img className={classes.logo} src={imgUrl} alt="logo" />
      <Typography
        color="textSecondary"
        className={classes.title}
        variant="h6"
        noWrap
      >
        Notes
      </Typography>
    </div>
  );
}

function SearchContainer({ onSearchClose }) {
  const { classes } = useStyles();
  return (
    <div className={classes.searchbarContainer}>
      <SearchInput
        //   ml={8}
        onSearchClose={onSearchClose}
      />
    </div>
  );
}

function TopBar() {
  const menuId = 'primary-search-account-menu';
  const { classes } = useStyles();
  const theme = useTheme();

  const [isSearchShowingInMobile, setSearchShowing] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [, { toggleNavBar }] = useUiStore();

  return (
    <div className={classes.grow}>
      <AppBar
        elevation={trigger ? 4 : 0}
        className={trigger ? undefined : classes.containerBorder}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="open drawer"
            onClick={toggleNavBar}
          >
            <MenuIcon
            // htmlColor={theme.custom.palette.iconColor}
            />
          </IconButton>
          {isMobile ? (
            isSearchShowingInMobile ? (
              <SearchContainer onSearchClose={() => setSearchShowing(false)} />
            ) : (
              <LogoContainer />
            )
          ) : (
            <>
              <LogoContainer />
              <SearchContainer onSearchClose={() => setSearchShowing(false)} />
            </>
          )}
          <div className={classes.grow} />
          {isMobile && !isSearchShowingInMobile ? (
            <div>
              <IconButton
                aria-label="search"
                aria-controls={menuId}
                onClick={() => setSearchShowing(true)}
              >
                <SearchIcon
                // htmlColor={theme.custom.palette.iconColor}
                />
              </IconButton>
            </div>
          ) : null}

          <div>
            <IconButton
              aria-label="toggle dark theme"
              aria-controls={menuId}
              //   onClick={onDarkModeToggle}
            >
              <ToggleLightModeIcon
              //   htmlColor={theme.custom.palette.iconColor}
              />
            </IconButton>
          </div>

          <div>
            <IconButton>
              <AccountsIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
