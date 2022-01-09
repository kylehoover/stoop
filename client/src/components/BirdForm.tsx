import { Container, TextField, Typography } from "@mui/material";

export function BirdForm() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add bird
      </Typography>
      <TextField id="birdName" variant="outlined" label="Name" required />
    </Container>
  );
}
