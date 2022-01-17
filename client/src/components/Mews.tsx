import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IBirdPreview } from "@shared/types";

interface IProps {
  birds: IBirdPreview[];
}

const dimensions = [100, 150];

export function Mews(props: IProps) {
  const { birds } = props;

  return (
    <Grid container justifyContent="center" spacing={4}>
      {birds.map((bird) => (
        <Grid item xs="auto" key={bird.id}>
          <Button sx={{ borderRadius: "50%", height: dimensions, width: dimensions }}>
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
          sx={{ borderRadius: "50%", height: dimensions, width: dimensions }}
        >
          <AddIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
