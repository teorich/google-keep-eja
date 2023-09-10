import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopBar from '../appBar/TopBar';
import { useUiStore } from '../../context/globalStore';
import DrawerItem from './DrawerItem';
import { ArrayRoutes } from '../../Router/routeObject';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  borderRight: 0,
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const useStyles = makeStyles()((theme) => ({
  drawer: {
    width: theme.mixins.drawer.minWidth,
  },
  sectionTitle: {
    padding: theme.spacing(2, 1, 0, 2),
    color: theme.palette.text.secondary,
  },
  drawerPaper: {
    background: theme.palette.background.default,
    width: theme.mixins.drawer.minWidth,
    border: 0,
  },
  drawerMin: {
    background: theme.palette.background.default,
    border: 0,
  },
}));

export default function CustomDrawer() {
  const { classes } = useStyles();
  const [{ isNavBarOpen }, _] = useUiStore();

  const navigate = useNavigate();
  const location = useLocation();

  const onDrawerItemSelected = (routeName?: string) => {
    navigate(routeName || '/');
  };

  return (
    <Box sx={{ display: 'flex', justifyItems: 'flex-start', marginTop: 8 }}>
      <Navigate to="/notes" />
      <CssBaseline />
      <TopBar />
      <Drawer
        classes={{
          root: classes.drawer,
          paper: isNavBarOpen ? classes.drawerPaper : classes.drawerMin,
        }}
        variant="permanent"
        open={isNavBarOpen}
      >
        <List sx={{ marginTop: 8 }}>
          {ArrayRoutes.map((item) => (
            <DrawerItem
              key={item.label}
              open={isNavBarOpen}
              text={<span>{item.label}</span>}
              isSelected={location.pathname === item.path}
              icon={item.icon}
              onClick={() => onDrawerItemSelected(item.path)}
            />
          ))}
        </List>
      </Drawer>
      <Outlet />
    </Box>
  );
}
