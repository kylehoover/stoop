import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Alert, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ITarget } from "@shared/types";
import { TargetForm } from "./TargetForm";
import { removeTarget } from "src/services";

interface IProps {
  birdId: string;
  target?: ITarget;
}

export function Target(props: IProps) {
  const { birdId, target } = props;
  const [showForm, setShowForm] = useState(false);
  const showAlert = !target && !showForm;
  const showTarget = target && !showForm;

  const displayText = target ? `${target.weight}g by 8am today` : "No target set";

  const addTarget = useCallback(() => {
    setShowForm(true);
  }, []);

  const closeForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const clearTarget = useCallback(() => {
    removeTarget(birdId);
  }, [birdId]);

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" component="div">
          Target
        </Typography>

        {target && (
          <IconButton size="small" aria-label="Remove target" onClick={clearTarget}>
            <ClearIcon />
          </IconButton>
        )}
      </Stack>

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

      {showForm && (
        <TargetForm birdId={birdId} target={target} onCancel={closeForm} onSuccess={closeForm} />
      )}

      {showTarget && (
        <Typography>
          {target.weight}g {dayjs(target.dateTime).format("ddd, MMM D, LT")}
        </Typography>
      )}
    </Paper>
  );
}
