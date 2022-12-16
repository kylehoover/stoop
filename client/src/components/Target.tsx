import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { Alert, Box, Button, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ITarget } from "@shared/types";
import { TargetForm } from "./TargetForm";
import { useRemoveTargetMutation } from "src/api";

interface IProps {
  birdId: string;
  target?: ITarget;
}

export function Target(props: IProps) {
  const { birdId, target } = props;
  const [showForm, setShowForm] = useState(false);
  const showAlert = !target && !showForm;
  const showTarget = target && !showForm;
  // const displayText = `${target?.weight}g by ${dayjs(target?.dateTime).format("ddd, MMM D, LT")}`;
  const displayText = `${target?.weight}g by ${dayjs(target?.dateTime).calendar(null, {
    sameDay: "[today at] h:mm A",
    nextDay: "[tomorrow at] h:mm A",
  })}`;
  console.log(target?.dateTime);
  console.log(dayjs("2022-12-30T08:00:00").calendar());

  const removeTargetMutation = useRemoveTargetMutation(birdId);
  const { isLoading } = removeTargetMutation;

  const addTarget = useCallback(() => {
    setShowForm(true);
  }, []);

  const editTarget = useCallback(() => {
    setShowForm(true);
  }, []);

  const removeTarget = useCallback(() => {
    removeTargetMutation.mutate(birdId);
  }, [birdId, removeTargetMutation.mutate]);

  const closeForm = useCallback(() => {
    setShowForm(false);
  }, []);

  return (
    <Paper variant="outlined" sx={{ padding: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="h6" component="div">
          Target
        </Typography>

        {showTarget && (
          <Box>
            <IconButton
              size="small"
              aria-label="Edit target"
              disabled={isLoading}
              onClick={editTarget}
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              aria-label="Remove target"
              disabled={isLoading}
              onClick={removeTarget}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
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

      {showTarget && <Typography>{displayText}</Typography>}
    </Paper>
  );
}
