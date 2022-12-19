import { Alert, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { IEntry } from "@shared/types";
import { EntryForm } from "./EntryForm";

interface IProps {
  birdId: string;
  entries: IEntry[];
}

export function Entries(props: IProps) {
  const { birdId, entries } = props;
  const [showForm, setShowForm] = useState(false);
  const hasEntries = entries.length > 0;
  const showAlert = !hasEntries && !showForm;

  const addEntry = useCallback(() => {
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
  }, []);

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <Typography variant="h6" component="div" mb={1}>
        Entries
      </Typography>

      {showAlert && (
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={addEntry}>
              Add entry
            </Button>
          }
        >
          No entries
        </Alert>
      )}

      {showForm && <EntryForm birdId={birdId} onCancel={closeForm} onSuccess={closeForm} />}
    </Paper>
  );
}
