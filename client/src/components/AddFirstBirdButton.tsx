import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export function AddFirstBirdButton() {
  return (
    <Button
      variant="outlined"
      component={Link}
      to="/app/birds/new"
      sx={{ borderRadius: "50%", height: [200, 250], width: [200, 250] }}
    >
      Add your first bird
    </Button>
  );
}
