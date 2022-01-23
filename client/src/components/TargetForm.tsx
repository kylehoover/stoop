import dayjs from "dayjs";
import { Box, Button, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { ITarget } from "@shared/types";
import { IHaveFormHandlers } from "src/types";

interface IProps extends IHaveFormHandlers<void> {
  target?: ITarget;
}

interface IData {
  dateTime: string;
  weight: string;
}

const defaultValues: IData = { dateTime: "", weight: "" };

export function TargetForm(props: IProps) {
  const { onCancel, onSuccess, target } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const isLoading = false;

  const onSubmit = useCallback(async (data: IData) => {
    console.log(data);
    console.log(dayjs(data.dateTime).toISOString());
  }, []);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="weight"
              control={control}
              rules={{ required: true, pattern: /^[0-9]*$/ }}
              render={({ field }) => (
                <TextField
                  id="weight"
                  size="small"
                  variant="outlined"
                  label="Target weight (grams)"
                  error={!!errors.weight}
                  disabled={isLoading}
                  inputProps={{ inputMode: "numeric" }}
                  fullWidth
                  required
                  {...field}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="dateTime"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  id="dateTime"
                  size="small"
                  variant="outlined"
                  label="Target time"
                  type="datetime-local"
                  error={!!errors.dateTime}
                  disabled={isLoading}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button size="small" disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="contained" type="submit" size="small" disabled={isLoading}>
            {isLoading ? <CircularProgress color="inherit" size={20} sx={{ mx: 2 }} /> : "Submit"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
