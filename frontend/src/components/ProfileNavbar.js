import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAuth } from "../AuthContext";

export default function ProfileNavbar({ addAssignment }) {
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const { user } = useAuth();

  const handleClose = () => {
    setOpen(false);
    setNewAssignment({ title: "", description: "", dueDate: "" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem 2rem 0.5rem 2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ margin: "0px 0px 0px 55px" }}
        >
          My Profile
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "70px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            padding: "15px 25px",
            borderRadius: "50px",
            textDecoration: "underline",
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
