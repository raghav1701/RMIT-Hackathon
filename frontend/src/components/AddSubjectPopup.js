// SubjectPopup.js
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

export default function AddSubjectPopup({ open, handleClose, addSubject }) {
  const [subjectName, setSubjectName] = useState("");

  const handleSubmit = () => {
    addSubject({ subjectName });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Subject</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Subject Name"
          fullWidth
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Subject</Button>
      </DialogActions>
    </Dialog>
  );
}
