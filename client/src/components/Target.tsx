import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack, Typography } from "@mui/material";
import { ITarget } from "@shared/types";

interface IProps {
  target?: ITarget;
}

export function Target(props: IProps) {
  const { target } = props;
  // const [isEditing, setIsEditing] = useS

  const displayText = target ? `${target.weight}g by 8am today` : "No target set";

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
