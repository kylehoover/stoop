import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { IBird, IEntry } from "@shared/types";

interface IProps {
  bird: IBird;
}

const imgDimensions = [100, 150];

export function Bird(props: IProps) {
  const {
    bird: { entries, img, name },
  } = props;

  const hasEntries = entries.length > 0;
  const [entry] = entries;
  const dateTime = entry?.dateTime;
  const weight = entry?.weight ?? "---";
  const burnRate = "---";

  return (
    <Box>
      <Stack direction="row" spacing={{ xs: 2, sm: 4, md: 6 }}>
        <Avatar src={img} sx={{ height: imgDimensions, width: imgDimensions }} />
        <Box>
          <Typography variant="h2" component="h1">
            {name}
          </Typography>

          <Box sx={{ alignItems: "flex-end", display: "flex", flexWrap: "wrap" }}>
            <Typography variant="h4" component="div" mr={1}>
              {weight}
            </Typography>
            <Typography variant="body1" component="div">
              g
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography variant="h4" component="div" mr={1}>
              {burnRate}
            </Typography>
            <Typography variant="body1" component="div" mr={2}>
              g/hr
            </Typography>
            {dateTime && (
              <Typography variant="caption" component="div" color="GrayText">
                (Today 8am)
              </Typography>
            )}
          </Box>
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2} mt={4}>
        <Typography variant="h6" component="div">
          Target: No target set
        </Typography>

        <IconButton aria-label="Edit target">
          <EditIcon />
        </IconButton>
      </Stack>

      {!hasEntries && (
        <Box sx={{ mt: 6, mx: "auto", width: "fit-content" }}>
          <Button variant="contained" sx={{ height: 50, width: 250 }}>
            Add your first entry
          </Button>
        </Box>
      )}
    </Box>
  );
}
