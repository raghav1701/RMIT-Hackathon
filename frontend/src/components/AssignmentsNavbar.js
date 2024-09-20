import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export default function AssignmentsNavbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black" }}
        elevation={0} // This removes the shadow
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "black",
              fontSize: "2.5rem",
              fontWeight: "600",
              margin: "30px 0 0 70px",
            }}
          >
            Assignments Tracker
          </Typography>
          <Button
            color="inherit"
            sx={{
              margin: "30px 70px 0 0",
              padding: "0.9rem 1.75rem",
              backgroundColor: "white",
              outline: "none",
              border: "none",
              borderRadius: "5rem",
              fontSize: "1.1rem",
              cursor: "pointer",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            Add Subject
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
