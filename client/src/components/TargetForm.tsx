import dayjs from "dayjs";
import { Box, Button, CircularProgress, Grid, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useCallback } from "react";
import { ITarget } from "@shared/types";
import { IHaveFormHandlers } from "src/types";
import { useUpdateTargetMutation } from "src/api";
import { DateTimeInput } from "./DateTimeInput";
import { NumericInput } from "./NumericInput";

interface IProps extends IHaveFormHandlers<ITarget> {
  birdId: string;
  target?: ITarget;
}

interface IData {
  dateTime: string;
  weight: string;
}

export function TargetForm(props: IProps) {
  const { birdId, onCancel, onSuccess, target } = props;
  const updateTargetMutation = useUpdateTargetMutation(birdId);
  const { isLoading } = updateTargetMutation;

  const defaultValues: IData = {
    dateTime: target?.dateTime ? dayjs(target?.dateTime).format("YYYY-MM-DDTHH:mm:ss") : "",
    weight: target?.weight.toString() ?? "",
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = useCallback(
    async (data: IData) => {
      const { dateTime, weight } = data;

      updateTargetMutation.mutate(
        {
          birdId,
          target: {
            dateTime: dayjs(dateTime).toISOString(),
            weight: parseInt(weight, 10),
          },
        },
        { onSuccess }
      );
    },
    [birdId, onSuccess, updateTargetMutation.mutate]
  );

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={6}>
            <NumericInput
              name="weight"
              label="Target weight (grams)"
              control={control as any}
              disabled={isLoading}
              hasError={!!errors.weight}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DateTimeInput
              name="dateTime"
              label="Target time"
              control={control as any}
              disabled={isLoading}
              hasError={!!errors.dateTime}
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
