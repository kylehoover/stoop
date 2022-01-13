import { Avatar, Box } from "@mui/material";
import { AddFirstBird } from "./AddFirstBird";
import { useBirds } from "../api";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const birds = useBirds();
  const hasBirds = birds.length > 0;
  const [b, setb] = useState<any>();

  useEffect(() => {
    axios.get("/api/birds/61dfa740c2fcaced3b462e4a").then((resp) => {
      console.log(resp.data.bird);
      setb(resp.data.bird);
    });
  }, []);

  return (
    <Box className="Home">
      {!hasBirds && <AddFirstBird />}
      <Avatar src={b?.img} sx={{ height: 200, width: 200 }} />
    </Box>
  );
}
