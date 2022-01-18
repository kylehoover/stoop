import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Box className="NavBar" sx={{ marginBottom: 2, padding: 2 }}>
      <Typography
        variant="h5"
        component={Link}
        to="/app"
        sx={{ color: "text.primary", textDecoration: "none" }}
      >
        stoop
      </Typography>
    </Box>
  );
}
