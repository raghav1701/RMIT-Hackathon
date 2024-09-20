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

export default function SubjectAssignmentNavbar({ addSubject }) {
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
        padding: "1rem 2rem",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        My Subjects
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ marginRight: "1rem" }}>
          Welcome, {user?.firstName || "User"}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Subject
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
