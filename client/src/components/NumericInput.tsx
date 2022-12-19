import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control;
  disabled: boolean;
  hasError: boolean;
  label: string;
  name: string;
}

export function NumericInput(props: IProps) {
  const { control, disabled, hasError, label, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true, pattern: /^[0-9]*$/ }}
      render={({ field }) => (
        <TextField
          id="numericInput" // TODO: create unique id
          size="small"
          variant="outlined"
          label={label}
          error={hasError}
          disabled={disabled}
          inputProps={{ inputMode: "numeric" }}
          fullWidth
          required
          {...field}
        />
      )}
    />
  );
}
