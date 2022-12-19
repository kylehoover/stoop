import { Alert, Button, IconButton, Paper, Stack, Typography } from "@mui/material";

export function BurnRate() {
  return (
    <Paper variant="outlined" sx={{ height: "100%", padding: 1 }}>
      <Typography variant="h6" component="div" mb={1}>
        Burn Rate
      </Typography>

      <Alert severity="info">Insufficient data</Alert>
    </Paper>
  );
}
