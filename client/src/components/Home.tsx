import { Box } from "@mui/material";
import { AddFirstBirdButton } from "./AddFirstBirdButton";
import { LoadingPlaceholder } from "./LoadingPlaceholder";
import { Mews } from "./Mews";
import { useBirds } from "../api";

export function Home() {
  const { data: birds, status } = useBirds();
  const hasBirds = birds && birds.length > 0;

  return (
    <Box className="Home">
      <LoadingPlaceholder status={status}>
        {hasBirds ? <Mews birds={birds} /> : <AddFirstBirdButton />}
      </LoadingPlaceholder>
    </Box>
  );
}
