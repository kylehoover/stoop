import AddIcon from "@mui/icons-material/Add";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { AddFirstBird } from "./AddFirstBird";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useBirds } from "../api";
import { getBirds } from "src/services";

export function Home() {
  const { data: birds } = useQuery("birds", getBirds);
  const hasBirds = birds && birds.length > 0;

  return (
    <Box className="Home">
      {hasBirds && (
        <Grid container spacing={4}>
          {birds.map((bird) => (
            <Grid item xs="auto" key={bird.id}>
              <Button sx={{ borderRadius: "50%", height: 150, width: 150 }}>
                <Avatar src={bird.img} sx={{ height: "inherit", width: "inherit" }} />
              </Button>
              <Typography variant="h6" component="div" sx={{ marginTop: 2, textAlign: "center" }}>
                {bird.name}
              </Typography>
            </Grid>
          ))}
          <Grid item xs="auto">
            <Button
              variant="outlined"
              component={Link}
              to="/app/birds/new"
              sx={{ borderRadius: "50%", height: 150, width: 150 }}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      )}
      {!hasBirds && <AddFirstBird />}
    </Box>
  );
}
