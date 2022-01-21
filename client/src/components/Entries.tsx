import { Alert, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { IEntry } from "@shared/types";

interface IProps {
  entries: IEntry[];
}

export function Entries(props: IProps) {
  const { entries } = props;
  const hasEntries = entries.length > 0;

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <Typography variant="h6" component="div" mb={1}>
        Entries
      </Typography>

      {!hasEntries && (
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small">
              Add entry
            </Button>
          }
        >
          No entries
        </Alert>
      )}
    </Paper>
  );
}
