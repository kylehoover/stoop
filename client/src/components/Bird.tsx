import { Avatar, Box, Button, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { IBird, IEntry } from "@shared/types";
import { BurnRate } from "./BurnRate";
import { Entries } from "./Entries";
import { Target } from "./Target";

interface IProps {
  bird: IBird;
}

const imgDimensions = [100, 150];

export function Bird(props: IProps) {
  const {
    bird: { id, entries, img, name, target },
  } = props;

  const [entry] = entries;
  const dateTime = entry?.dateTime;
  const weight = entry?.weight ?? "---";
  const burnRate = "---";

  return (
    <Box>
      <Stack direction="row" spacing={{ xs: 2, sm: 4, md: 6 }} mb={2}>
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

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={6}>
          <Target birdId={id} target={target} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BurnRate />
        </Grid>
      </Grid>

      <Entries entries={entries} />
    </Box>
  );
}
