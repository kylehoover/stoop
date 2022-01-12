import { Box } from "@mui/material";
import { AddFirstBird } from "./AddFirstBird";
import { useBirds } from "../api";

export function Home() {
  const birds = useBirds();
  const hasBirds = birds.length > 0;

  return <Box className="Home">{!hasBirds && <AddFirstBird />}</Box>;
}
