import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Paper, Fade, ClickAwayListener, useTheme } from '@mui/material';

import ActionsBar from '../todo/Actions';
import ContentTitle from '../todo/ContentTitle';
import TodoContent from '../todo/TodoContent';
import { useTodosStore } from '../../context/globalStore';
import { Todo } from '../../interfaces/todo';

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: 'block',
    flexDirection: 'column',
    borderColor: theme.palette.itemBorderColor,
    borderWidth: theme.spacing(0.1),
    borderStyle: 'solid',
    // height: 100,
    width: '100%',
    position: 'relative',
    flexWrap: 'wrap',
  },
  textTitle: {
    ...theme.fontFamily.metropolis,
    padding: theme.spacing(1.5, 2, 0, 2),
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.text.primary,
    lineHeight: theme.spacing(0.18),
  },
  barWrapper: {
    display: 'flex',
    // position: 'absolute',
    // bottom: 0,
    flexDirection: 'row',
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
  },
}));

export default function TodoItem({
  noteItem,
  isEditMode,
  onMouseUpCapture,
}: {
  noteItem: Todo;
  isEditMode: boolean;
  onMouseUpCapture: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  const { classes } = useStyles();
  const theme = useTheme();
  const [isHovered, setHovered] = useState(false);
  const [title, setTitle] = useState(noteItem.title);
  const [noteinputs, setNotes] = useState<Array<string>>(noteItem.notes || []);

  const [, dispatch] = useTodosStore();

  const updateTodoItem = (todoItem) => {
    dispatch({ type: 'UPDATED', payload: {} });
  };

  return (
    <Paper
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes.wrapper}
      elevation={isHovered || isEditMode ? 2 : 0}
    >
      <div onMouseUpCapture={onMouseUpCapture}>
        <ContentTitle
          title={title}
          setTitle={setTitle}
          isEditMode={isEditMode}
        />
        <TodoContent
          notes={noteinputs}
          setNotes={setNotes}
          isEditMode={isEditMode}
        />
      </div>

      <Fade in={isHovered || isEditMode}>
        <div className={classes.barWrapper}>
          <ActionsBar id={noteItem.id} isCreateMode={false} />
        </div>
      </Fade>
    </Paper>
  );
}
