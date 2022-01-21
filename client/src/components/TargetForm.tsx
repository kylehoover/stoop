import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { ITarget } from "@shared/types";
import { IHaveFormHandlers } from "src/types";

interface IProps extends IHaveFormHandlers<void> {
  target?: ITarget;
}

interface IData {
  weight: string;
}

const defaultValues: IData = { weight: "" };

export function TargetForm(props: IProps) {
  const { onCancel, onSuccess, target } = props;

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ defaultValues });

  console.log(errors);

  const isLoading = false;

  const onSubmit = useCallback(() => {}, []);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
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
                  fullWidth
                  required
                  inputProps={{ inputMode: "numeric" }}
                  {...field}
                />
              )}
            ></Controller>
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={1}>
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
