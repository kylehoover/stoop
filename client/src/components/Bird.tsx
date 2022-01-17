import { Avatar, Box, Stack, Typography } from "@mui/material";
import { IBird } from "@shared/types";

interface IProps {
  bird: IBird;
}

const imgDimensions = [150, 200];

export function Bird(props: IProps) {
  const {
    bird: { img, name },
  } = props;

  return (
    <Box>
      <Stack direction="row" spacing={{ xs: 4, sm: 8 }}>
        <Avatar src={img} sx={{ height: imgDimensions, width: imgDimensions }} />
        <Typography variant="h2" component="h1">
          {name}
        </Typography>
      </Stack>
    </Box>
  );
}
