import { Box, Stack } from "@mui/material";
import { AddFirstBirdButton } from "./AddFirstBirdButton";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { Mews } from "./Mews";
import { useBirds } from "../api";

export function Home() {
  const { data: birds = [], status } = useBirds();
  const hasBirds = birds.length > 0;

  return (
    <Box className="Home">
      <LoadingPlaceholder status={status} errorMessage="There was an error loading your birds.">
        {hasBirds ? (
          <Mews birds={birds} />
        ) : (
          <Stack direction="row" justifyContent="center" sx={{ marginTop: 10 }}>
            <AddFirstBirdButton />
          </Stack>
        )}
      </LoadingPlaceholder>
    </Box>
  );
}
