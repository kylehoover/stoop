import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  function signIn() {
    navigate("/app");
  }

  return (
    <Stack alignItems="center" sx={{ marginTop: 10 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        stoop
      </Typography>

      <Typography variant="body1" gutterBottom>
        A simple logbook for falconers.
      </Typography>

      <Button variant="contained" sx={{ marginTop: 10 }} onClick={signIn}>
        Sign In
      </Button>
    </Stack>
  );
}
