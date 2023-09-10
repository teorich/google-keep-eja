import Dialog from '@mui/material/Dialog';
import { makeStyles } from 'tss-react/mui';
import { Button, InputBase, Paper } from '@mui/material';
import { useState } from 'react';
import { Todo, TodoActionKind } from '../../interfaces/todo';
import TodoActions from './Actions';
import TodoContent from './TodoContent';
import { useTodosStore } from '../../context/globalStore';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value?: string) => void;
  noteItem?: Todo | null | undefined;
}

const useStyles = makeStyles()((theme) => ({
  paperWrapper: {
    flex: 1,
    minWidth: theme.spacing(75),
    margin: '0 auto',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputTitleRoot: {
    ...theme.fontFamily.metropolis,
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
    ...theme.fontFamily.roboto,
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
    ...theme.fontFamily.roboto,
    border: 0,
    background: 'none',
    color: theme.palette.text.primary,
    fontWeight: 'bolder',
    cursor: 'pointer',
  },
  todoCreateWrapper: {
    flex: 1,
    minWidth: theme.spacing(75),
    margin: '0 auto',
  },
}));

export default function EditTodo(props: SimpleDialogProps) {
  const { onClose, open, noteItem } = props;

  const { classes } = useStyles();

  const [isFocussed, setFocussed] = useState(false);
  const [title, setTitle] = useState(noteItem?.title);
  const [notes, setNotes] = useState(noteItem?.notes);
  const [, dispatch] = useTodosStore();
  const onCloseClick = () => {
    const noteTexts = notes.map((item) => item.text);
    if (title || noteTexts.length > 0) {
      const payload = {
        id: noteItem?.id,
        title,
        notes,
      };
      dispatch({
        type: TodoActionKind.UPDATE,
        payload,
      });
    }
  };

  const handleClose = () => {
    onClose();
    onCloseClick();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      className={classes.todoCreateWrapper}
    >
      <Paper elevation={2} classes={{ root: classes.paperWrapper }}>
        <InputBase
          placeholder={isFocussed ? 'Title' : 'Take a note...'}
          classes={{
            root: open ? classes.inputTitleRoot : classes.inputNoteRoot,
            input: classes.inputTitleInput,
          }}
          onFocus={() => setFocussed(true)}
          inputProps={{ 'aria-label': 'note title' }}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        {open ? (
          <TodoContent notes={notes} setNotes={setNotes} isEditMode />
        ) : null}

        <div className={classes.barWrapper}>
          <TodoActions id="" isCreateMode />
          <Button className={classes.buttonClick} onClick={() => handleClose()}>
            Close
          </Button>
        </div>
      </Paper>
    </Dialog>
  );
}

EditTodo.defaultProps = {
  noteItem: [],
};
