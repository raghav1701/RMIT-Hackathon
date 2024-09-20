import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SubjectAssignmentNavbar from "./SubjectAssignmentNavbar";
import BannerBackground from "../Assets/home-banner-background.png";
import Divider from "@mui/material/Divider";
import { useAuth } from "../AuthContext";

const API_BASE_URL = "http://localhost:4100/users";

export default function SubjectAssignments() {
  const { id } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/subjects/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch subjects");
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAssignment = async () => {
    try {
      const response = await fetch(
        "http://localhost:4100/users/addassignment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            ...newAssignment,
            subjectId: id,
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to add assignment");
      const addedAssignment = await response.json();
      setAssignments([...assignments, addedAssignment]);
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding assignment:", error);
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAssignment({ title: "", description: "", dueDate: "" });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${BannerBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right top",
          backgroundSize: "contain",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 0,
          width: "700px",
          height: "100%",
        }}
      />
      <SubjectAssignmentNavbar />
      <Divider
        sx={{ width: "100%", borderBottomWidth: 2, margin: "0 70px 0 90px" }}
      />
      <Box sx={{ padding: "2rem", position: "relative", zIndex: 1 }}>
        {/* <Typography variant="h4">Subject Name: {subjectId?.name}</Typography> */}
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          Assignments:
        </Typography>
        {assignments.map((assignment) => (
          <Box key={assignment._id} sx={{ marginTop: 2 }}>
            <Typography variant="h6">{assignment.title}</Typography>
            <Typography variant="body1">
              Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              Description: {assignment.description}
            </Typography>
          </Box>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          sx={{ marginTop: "20px" }}
        >
          Add Assignment
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
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
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddAssignment} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
