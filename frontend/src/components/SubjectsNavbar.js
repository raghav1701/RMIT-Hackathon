import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useAuth } from "../AuthContext";

export default function SubjectsNavbar({ addSubject }) {
  const [open, setOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSubject("");
  };

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      addSubject({ name: newSubject.trim() });
      handleClose();
    }
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
          My Subjects
        </Typography>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: "#FE9E0D",
            color: "black",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "50px",
            marginLeft: "50px",
            fontSize: "12px",
          }}
        >
          Add Subject
        </Button>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Subject</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subject Name"
            fullWidth
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSubject} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
