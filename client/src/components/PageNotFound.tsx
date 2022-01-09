import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <Container sx={{ marginTop: 10 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Umm...
      </Typography>
      <Typography>
        There's nothing here. Would you like to <Link to="/">return to the main site</Link>?
      </Typography>
    </Container>
  );
}
