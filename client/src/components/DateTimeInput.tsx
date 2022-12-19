import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control;
  disabled: boolean;
  hasError: boolean;
  label: string;
  name: string;
}

export function DateTimeInput(props: IProps) {
  const { control, disabled, hasError, label, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextField
          id="dateTime" // TODO: create unique id
          size="small"
          variant="outlined"
          label={label}
          type="datetime-local"
          error={hasError}
          disabled={disabled}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          {...field}
        />
      )}
    />
  );
}
