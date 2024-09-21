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

export default function AssignmentsNavbar({ addAssignment }) {
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const { user } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewAssignment({ title: "", description: "", dueDate: "" });
  };

  const handleAddAssignment = () => {
    if (newAssignment.title.trim() && newAssignment.dueDate) {
      addAssignment(newAssignment);
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
          Assignment Planner
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
          Add Assignment
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
        <DialogTitle>Add New Assignment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newAssignment.title}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={newAssignment.description}
            onChange={(e) =>
              setNewAssignment({
                ...newAssignment,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={newAssignment.dueDate}
            onChange={(e) =>
              setNewAssignment({ ...newAssignment, dueDate: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAssignment} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
