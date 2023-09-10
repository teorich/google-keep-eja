import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Paper, Fade } from '@mui/material';

import ActionsBar from '../todo/Actions';
import ContentTitle from '../todo/ContentTitle';
import TodoContent from '../todo/TodoContent';
import { Todo } from '../../interfaces/todo';

const useStyles = makeStyles()((theme) => ({
  wrapper: {
    display: 'block',
    flexDirection: 'column',
    borderColor: theme.palette.itemBorderColor,
    borderWidth: theme.spacing(0.1),
    borderStyle: 'solid',
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
  contentTodo: {
    padding: 5,
  },
}));

export default function TodoItem({
  noteItem,
  isEditMode,
  onMouseUpCapture,
}: {
  noteItem: Todo;
  onMouseUpCapture: React.MouseEventHandler<HTMLDivElement> | undefined;
  isEditMode?: boolean;
}) {
  const { classes } = useStyles();
  const [isHovered, setHovered] = useState(false);
  const [title, setTitle] = useState(noteItem.title);
  const [noteinputs, setNotes] = useState<Array<string>>(noteItem.notes || []);

  return (
    <Paper
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classes.wrapper}
      elevation={isHovered || isEditMode ? 2 : 0}
    >
      <div className={classes.contentTodo} onMouseUpCapture={onMouseUpCapture}>
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

TodoItem.defaultProps = {
  isEditMode: false,
};
