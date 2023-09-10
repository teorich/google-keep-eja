import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { makeStyles } from 'tss-react/mui';
import {
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  InputBase,
  Paper,
  useTheme,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Todo, TodoActionKind } from '../../interfaces/todo';
import TodoActions from './Actions';
import TodoContent from './TodoContent';
import { useTodosStore } from '../../context/globalStore';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value?: string) => void;
  noteItem?: Todo;
}

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
}));

export default function EditTodo(props: SimpleDialogProps) {
  const { onClose, open, noteItem } = props;

  const handleClose = () => {
    onClose();
    console.log('item', noteItem);
  };

  const { classes } = useStyles();
  const theme = useTheme();
  const [isFocussed, setFocussed] = useState(false);
  const [title, setTitle] = useState(noteItem?.title);
  const [notes, setNotes] = useState(noteItem?.notes);
  const [, dispatch] = useTodosStore();
  const onCloseClick = () => {
    const noteTexts = notes.map((item) => item.text);
    if (title || noteTexts.length > 0) {
      const payload = {
        id: nanoid(),
        title,
        notes,
      };
      //   dispatch({
      //     type: TodoActionKind.UPDATE,
      //     payload,
      //   });
    }
    // setTitle('');
    // setNotes([]);
    // setFocussed(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div>
        <Paper
          elevation={2}

          //   classes={{ root: classes.paperWrapper }}
        >
          <InputBase
            placeholder={isFocussed ? 'Title' : 'Take a note...'}
            // style={{
            //     display: 'flex',
            //     flexDirection: 'column',
            //     width: '500px',
            //   }}
            classes={{
              root: isFocussed ? classes.inputTitleRoot : classes.inputNoteRoot,
              input: classes.inputTitleInput,
            }}
            onFocus={() => setFocussed(true)}
            inputProps={{ 'aria-label': 'note title' }}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TodoContent notes={notes} setNotes={setNotes} isEditMode={open} />

          <div className={classes.barWrapper}>
            <TodoActions id="" isCreateMode />
            <Button
              className={classes.buttonClick}
              onClick={() => onCloseClick()}
            >
              Close
            </Button>
          </div>
        </Paper>
      </div>
    </Dialog>
  );
}

EditTodo.defaultProps = {
  noteItem: [],
};
