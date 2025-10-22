import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        height: 400,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
      }}
    >
      <SearchOff
        sx={{ fontSize: 100 }}
        color="primary"
      />
      <Typography
        variant="h3"
        gutterBottom
      >
        Oops - we could not fint what you are looking for
      </Typography>
      <Button
        fullWidth
        component={Link}
        to="/activities"
      >
        Return to the activities page
      </Button>
    </Paper>
  );
};
