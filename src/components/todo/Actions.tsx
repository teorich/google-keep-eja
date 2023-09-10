import { useRef } from 'react';

import { IconButton, Tooltip } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import {
  PaletteOutlined as PaletteIcon,
  LabelOutlined as LabelIcon,
  DeleteOutlineOutlined as DeleteIcon,
  FileCopyOutlined as CopyIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTodosStore } from '../../context/globalStore';
import { TodoActionKind } from '../../interfaces/todo';

const useStyles = makeStyles()((theme) => ({
  optionsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionWrapperFirst: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  optionWrapperLast: {
    padding: theme.spacing(0, 0, 0, 1),
  },
  optionWrapper: {
    padding: theme.spacing(0, 1),
  },
  barClose: {},
}));

export default function TodoActions({ id, isCreateMode }) {
  const { classes } = useStyles();
  const theme = useTheme();
  const refActionColor = useRef(null);
  const refActionLabel = useRef(null);
  const [, dispatch] = useTodosStore();

  const deleteNote = () => {
    dispatch({ type: TodoActionKind.DELETE, payload: { id } });
  };

  return (
    <div className={classes.optionsWrapper}>
      <div className={classes.optionWrapperFirst}>
        <Tooltip title="Change color">
          <IconButton
            size="small"
            aria-label="change color"
            ref={refActionColor}
          >
            <PaletteIcon
              htmlColor={theme.palette.iconHighlight}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.optionWrapper}>
        <Tooltip title="Change labels">
          <IconButton
            size="small"
            aria-label="change labels"
            ref={refActionLabel}
          >
            <LabelIcon
              htmlColor={theme.palette.iconHighlight}
              fontSize="small"
            />
          </IconButton>
        </Tooltip>
      </div>
      {isCreateMode ? null : (
        <>
          <div className={classes.optionWrapper}>
            <Tooltip title="Make a copy">
              <IconButton size="small" aria-label="make a copy">
                <CopyIcon
                  htmlColor={theme.palette.iconHighlight}
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </div>

          <div className={classes.optionWrapperLast}>
            <Tooltip title="Delete note">
              <IconButton
                size="small"
                aria-label="delete note"
                onClick={deleteNote}
              >
                <DeleteIcon
                  htmlColor={theme.palette.iconHighlight}
                  color="error"
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}
