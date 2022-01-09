import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export function AddFirstBird() {
  return (
    <Stack direction="row" justifyContent="center" sx={{ marginTop: 10 }}>
      <Button
        variant="outlined"
        component={Link}
        to="/app/birds/new"
        sx={{ borderRadius: "50%", height: [200, 250], width: [200, 250] }}
      >
        Add your first bird
      </Button>
    </Stack>
  );
}
