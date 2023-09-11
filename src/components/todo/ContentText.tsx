import { makeStyles } from 'tss-react/mui';
import { InputBase, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

const useStyles = makeStyles()((theme) => ({
  inputNoteRoot: {
    padding: theme.spacing(0.5, 2, 1.5, 2),
    display: 'flex',
  },
  inputNoteInput: {
    fontWeight: 400,
    fontSize: '0.88rem',
    padding: 0,
    color: theme.palette.text.primary,
  },
  textContainer: {
    padding: theme.spacing(0.5, 2, 1.5, 2),
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  textNote: {
    fontWeight: 400,
    fontSize: '0.88rem',
    color: theme.palette.text.primary,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
}));

export default function ContentText({
  notes,
  setNotes,
  isEditMode,
}: {
  notes: Array<string>;
  setNotes: Dispatch<SetStateAction<string[]>>;
  isEditMode: boolean;
}) {
  const { classes } = useStyles();
  const reducedText = notes.map(({ text }) => text).join('\n');

  const onTextChanged = (event) => {
    const text = event.target.value;
    const textParts = text
      .split('\n')
      .map((text) => ({ text, isCompleted: false }));
    setNotes(textParts);
  };

  return (
    <div>
      {isEditMode ? (
        <InputBase
          placeholder="Take a note..."
          classes={{
            root: classes.inputNoteRoot,
            input: classes.inputNoteInput,
          }}
          inputProps={{ 'aria-label': 'take a note' }}
          value={reducedText}
          onChange={onTextChanged}
          multiline
        />
      ) : (
        <div>
          {notes.map(({ text }, index) => (
            <Typography
              key={index}
              className={classes.textNote}
              variant="body1"
              noWrap
            >
              {text}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
}
