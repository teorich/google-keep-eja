/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useTheme } from '@mui/material/styles';
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   useScrollTrigger,
//   useMediaQuery,
// } from '@material-ui/core';
import {
  AccountCircleOutlined as AccountsIcon,
  DashboardOutlined as TileViewIcon,
  Brightness4Outlined as ToggleDarkModeIcon,
  Brightness5Outlined as ToggleLightModeIcon,
  SearchOutlined as SearchIcon,
  Menu as MenuIcon,
  ViewAgendaOutlined as ListIcon,
} from '@mui/icons-material';

import {
  useScrollTrigger,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
// import ProfilePopover from './ProfilePopover';
import SearchInput from './SearchInput';
import { useUiStore } from '../../context/globalStore';
// import { useUserStore, useUiStore } from '../../context/globalStore';
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
  //   const [isProfilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [isSearchShowingInMobile, setSearchShowing] = useState(false);
  //   const profileMenuRef = useRef();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  // const [{ isDarkMode, isListView }, { toggleDarkMode, toggleView }] =
  //   useUserStore();
  //   const [, updateUserSettings] = useMutation(updateUser);
  const [, { toggleNavBar }] = useUiStore();
  //   const onDarkModeToggle = useCallback(() => {
  //     updateUserSettings({ darkMode: !isDarkMode });
  //     toggleDarkMode();
  //   }, [updateUserSettings, toggleDarkMode, isDarkMode]);
  //   const onViewToggle = useCallback(() => {
  //     updateUserSettings({ listMode: !isListView });
  //     toggleView();
  //   }, [updateUserSettings, toggleView, isListView]);

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
          {/* <div>
            <IconButton
              aria-label="refresh"
              aria-controls={menuId}
              onClick={refreshItems}
            >
              <RefreshIcon />
            </IconButton>
          </div> */}
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
          {/* {isMobile ? null : (
            <div>
              <IconButton
                aria-label={
                  isListView ? 'toggle tile view' : 'toggle list view'
                }
                aria-controls={menuId}
                // onClick={onViewToggle}
              >
                {isListView ? (
                  <TileViewIcon
                  //   htmlColor={theme.custom.palette.iconColor}
                  />
                ) : (
                  <ListIcon
                  //   htmlColor={theme.custom.palette.iconColor}
                  />
                )}
              </IconButton>
            </div>
          )} */}
          <div>
            <IconButton
            //   edge="end"
            //   ref={profileMenuRef}
            //   aria-label="account of current user"
            //   aria-controls={menuId}
            //   aria-haspopup="true"
            //   onClick={() => setProfilePopoverOpen(true)}
            >
              <AccountsIcon
              //   htmlColor={theme.custom.palette.iconColor}
              />
            </IconButton>
          </div>
        </Toolbar>
        {/* <ProfilePopover
          anchorEl={profileMenuRef.current}
          isOpen={isProfilePopoverOpen}
          onClose={() => setProfilePopoverOpen(false)}
        /> */}
      </AppBar>
    </div>
  );
}

export default TopBar;
