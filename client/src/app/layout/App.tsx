import { Outlet } from "react-router";
import { CssBaseline, Container, Box } from "@mui/material";
import { NavBar } from "./NavBar";

function App() {
  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <NavBar />
      <Container
        maxWidth="xl"
        sx={{ mt: 3 }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}

export default App;
