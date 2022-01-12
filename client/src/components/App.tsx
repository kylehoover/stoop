import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export function App() {
  return (
    <Box className="App">
      <NavBar />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
}
