/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Paper, InputBase, Collapse, ClickAwayListener } from '@mui/material';
import { nanoid } from 'nanoid';
import { Button } from '@mui/base/Button';
import TodoActions from '../todo/Actions';
import TodoContent from '../todo/TodoContent';
import { useTodosStore } from '../../context/globalStore';
import { TodoActionKind } from '../../interfaces/todo';

const useStyles = makeStyles()((theme) => ({
  paperWrapper: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.short,
    }),
    borderColor: theme.palette.itemBorderColor,
    borderWidth: theme.spacing(0.1),
    borderStyle: 'solid',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputTitleRoot: {
    // ...theme.fontFamily.metropolis,
    padding: theme.spacing(1.25, 2),
  },
  inputTitleInput: {
    fontWeight: 500,
    fontSize: '1rem',
    padding: 0,
    lineHeight: '1rem',
    verticalAlign: 'middle',
    color: theme.palette.text.primary,
  },
  inputNoteRoot: {
    // ...theme.fontFamily.roboto,
    padding: theme.spacing(1.5, 2),
  },
  inputNoteInput: {
    fontWeight: 500,
    fontSize: '0.85rem',
    padding: 0,
    color: theme.palette.text.primary,
  },
  barWrapper: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
  },
  buttonClick: {
    // ...theme.fontFamily.roboto,
    border: 0,
    background: 'none',
    color: theme.palette.text.primary,
    fontWeight: 'bolder',
    cursor: 'pointer',
  },
}));

export default function CreateTodo() {
  const { classes } = useStyles();
  const [isFocussed, setFocussed] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [, dispatch] = useTodosStore();
  const onCloseClick = () => {
    const noteTexts = notes.map((noteItem) => noteItem.text);
    if (title || noteTexts.length > 0) {
      const payload = {
        id: nanoid(),
        title,
        notes,
      };
      dispatch({
        type: TodoActionKind.CREATE,
        payload,
      });
    }
    setTitle('');
    setNotes([]);
    setFocussed(false);
  };

  return (
    <Paper elevation={2} classes={{ root: classes.paperWrapper }}>
      <ClickAwayListener
        onClickAway={() => {
          onCloseClick();
          setFocussed(false);
        }}
      >
        <Collapse
          classes={{ wrapperInner: classes.wrapper }}
          in={isFocussed}
          collapsedSize={40}
        >
          <InputBase
            placeholder={isFocussed ? 'Title' : 'Take a note...'}
            classes={{
              root: isFocussed ? classes.inputTitleRoot : classes.inputNoteRoot,
              input: classes.inputTitleInput,
            }}
            onFocus={() => setFocussed(true)}
            inputProps={{ 'aria-label': 'note title' }}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {isFocussed ? (
            <TodoContent notes={notes} setNotes={setNotes} isEditMode />
          ) : null}

          <div className={classes.barWrapper}>
            <TodoActions id="" isCreateMode />
            <Button
              className={classes.buttonClick}
              onClick={() => onCloseClick()}
            >
              Close
            </Button>
          </div>
        </Collapse>
      </ClickAwayListener>
    </Paper>
  );
}
