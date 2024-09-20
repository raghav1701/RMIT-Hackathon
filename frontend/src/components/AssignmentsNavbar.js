import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import SubjectPopup from "./SubjectPopup";

export default function AssignmentsNavbar({ addSubject }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", paddingTop: "25px" }}
        elevation={0}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/assignments" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "black",
                fontSize: "2.5rem",
                fontWeight: "600",
                marginLeft: "70px",
              }}
            >
              Assignments Tracker
            </Typography>
          </Link>
          <Button
            color="inherit"
            onClick={handleClickOpen}
            sx={{
              marginRight: "70px",
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
      <SubjectPopup
        open={open}
        handleClose={handleClose}
        addSubject={addSubject}
      />
    </Box>
  );
}
