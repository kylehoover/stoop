import EditIcon from "@mui/icons-material/Edit";
import { Alert, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { ITarget } from "@shared/types";
import { useCallback, useState } from "react";
import { TargetForm } from "./TargetForm";

interface IProps {
  target?: ITarget;
}

export function Target(props: IProps) {
  const { target } = props;
  const [showForm, setShowForm] = useState(false);
  const showAlert = !target && !showForm;

  const displayText = target ? `${target.weight}g by 8am today` : "No target set";

  const addTarget = useCallback(() => {
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
  }, []);

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <Typography variant="h6" component="div" mb={1}>
        Target
      </Typography>

      {showAlert && (
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={addTarget}>
              Add target
            </Button>
          }
        >
          No target set
        </Alert>
      )}

      {showForm && <TargetForm target={target} onCancel={closeForm} onSuccess={() => {}} />}
    </Paper>
  );

  return (
    <Stack direction="row" alignItems="center" spacing={2} mt={4}>
      <Typography variant="h6" component="div">
        Target: {displayText}
      </Typography>

      <IconButton aria-label="Edit target">
        <EditIcon />
      </IconButton>
    </Stack>
  );
}
