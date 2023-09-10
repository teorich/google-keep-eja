import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { InputBase, Typography } from '@mui/material';

const useStyles = makeStyles()((theme) => ({
  inputTitleRoot: {
    ...theme.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
  },
  inputTitleInput: {
    fontWeight: 500,
    fontSize: '1rem',
    padding: 0,
    lineHeight: theme.spacing(0.18),
    verticalAlign: 'middle',
    color: theme.palette.text.primary,
  },
  textTitle: {
    ...theme.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(0.18),
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function ContentTitle({ title, setTitle, isEditMode }) {
  const classes = useStyles();

  return (
    <div>
      {isEditMode ? (
        <InputBase
          placeholder="Title"
          classes={{
            root: classes.inputTitleRoot,
            input: classes.inputTitleInput,
          }}
          inputProps={{ 'aria-label': 'note title' }}
          value={title}
          multiline
          onChange={(event) => setTitle(event.target.value)}
        />
      ) : (
        <Typography noWrap className={classes.textTitle} variant="subtitle1">
          {title}
        </Typography>
      )}
    </div>
  );
}
