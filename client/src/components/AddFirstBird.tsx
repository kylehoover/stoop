import { Button, Stack } from "@mui/material";

export function AddFirstBird() {
  return (
    <Stack direction="row" justifyContent="center" sx={{ marginTop: 10 }}>
      <Button
        variant="outlined"
        sx={{ borderRadius: "50%", height: [200, 250], width: [200, 250] }}
      >
        Add your first bird
      </Button>
    </Stack>
  );
}
