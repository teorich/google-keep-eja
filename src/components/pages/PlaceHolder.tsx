import { Grid } from '@mui/material';

export default function PlaceHolder({ content }: { content: string }) {
  return (
    <Grid container>
      <Grid>{content}</Grid>
    </Grid>
  );
}
