import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  listItemRoot: {
    borderRadius: theme.spacing(0, 3, 3, 0),
  },
  listItemSelected: {
    backgroundColor: `${theme.palette.secondary.light} !important`,
  },
}));

function DrawerItem({ text, icon, isSelected, onClick, open }) {
  const { classes } = useStyles();

  return (
    <ListItemButton
      selected={isSelected}
      classes={{
        selected: classes.listItemSelected,
        root: classes.listItemRoot,
      }}
      onClick={onClick}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={text}
        sx={{ opacity: open ? 1 : 0, width: open ? 'auto' : 0 }}
      />
    </ListItemButton>
  );
}

export default DrawerItem;
